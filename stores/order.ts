import { defineStore } from 'pinia'
import { ApolloError } from '@apollo/client/errors'
import { QULOT_CANCEL_ORDER } from '~~/apollo/mutations'
import {
  GET_QULOT_ORDERS,
  GET_QULOT_ORDER_DETAIL,
  GET_ROUND_BY_ID,
  GET_USER_ORDERS,
  GET_USER_ORDER_BY_ID,
} from '~~/apollo/queries'
import { QULOT_SUBSCRIPTION_ORDER } from '~~/apollo/subscriptions'
import { Order, QulotOrder } from '~~/types/order'
import { Ticket } from '~~/types/ticket'
import { Round } from '~~/types/lottery'

interface GetUserOrdersResult {
  orders: Order[]
}

interface GetOrderTickets {
  isLoading: boolean
  tickets: Ticket[]
}

type OrderTickets = { [propKey: string]: GetOrderTickets }

type GetUserOrdersParams = {
  orderBy: string
  orderDirection: 'desc' | 'asc'
  skip: number
  first: number
}

type GetQulotOrdersParams = {
  orderBy: string
  orderDesc: boolean
  limit: number
  offset: number
}

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
      orders: [] as Order[],
      orderTickets: {} as OrderTickets,
      getOrdersParams: {
        orderBy: 'timestamp',
        orderDirection: 'desc',
        skip: 0,
        first: 5,
      } as GetUserOrdersParams,
      isLoading: true,
      isComplete: false,
      qulotOrder: null as QulotOrder | null,
      error: null as string | null,
      qulotOrderDetail: null as QulotOrder | null,
      getQulotOrdersParams: {
        orderBy: 'created_at',
        orderDesc: true,
        limit: 5,
        offset: 0,
      } as GetQulotOrdersParams,
      qulotOrders: [] as QulotOrder[],
    }
  },
  actions: {
    clear() {
      this.orders = []
      this.orderTickets = {}
      this.getOrdersParams.skip = 0
      this.getOrdersParams.first = 5

      this.qulotOrders = []
      this.getQulotOrdersParams.limit = 5
      this.getQulotOrdersParams.offset = 0
    },
    nextPage() {
      if (!this.isComplete) {
        this.getOrdersParams.skip += this.getOrdersParams.first
      }
    },
    async fetchUserOrders(user: string) {
      this.isLoading = true
      const { chainId } = useEthers()
      const { data, pending, execute } =
        await useAsyncQuery<GetUserOrdersResult>({
          query: GET_USER_ORDERS,
          clientId: chainId.value.toString(),
          variables: {
            ...this.getOrdersParams,
            user,
          },
        })
      if (pending.value) {
        await execute()
      }
      if (data.value && data.value.orders.length) {
        this.orders = uniqueBy(
          [...this.orders, ...data.value.orders],
          (order) => order.id
        )
        this.isComplete = false
      } else {
        this.isComplete = true
      }
      this.isLoading = false
    },
    async fetchUserOrder(user: string, orderId: string) {
      this.isLoading = true
      const { chainId } = useEthers()
      const { data, pending, execute } =
        await useAsyncQuery<GetUserOrdersResult>({
          query: GET_USER_ORDER_BY_ID,
          clientId: chainId.value.toString(),
          variables: {
            user,
            orderId,
          },
        })
      if (pending.value) {
        await execute()
      }
      if (data.value && data.value.orders.length) {
        this.orders = data.value.orders
      }
      this.isLoading = false
    },
    async fetchOrderTickets(orderId: string) {
      const ticketStore = useTicketStore()
      const order = this.orders.find((order) => order.id === orderId)
      if (order && order.ticketIds && order.ticketIds.length) {
        if (!Object.keys(this.orderTickets).includes(orderId)) {
          this.orderTickets[orderId] = { isLoading: false, tickets: [] }
        }
        this.orderTickets[orderId].isLoading = true
        const tickets = await ticketStore.fetchMultiTickets(order.ticketIds)
        await ticketStore.fetchTicketsInfo(tickets)
        this.orderTickets[orderId] = { isLoading: false, tickets }
      }
    },
    cleanOrderTickets(orderId: string) {
      this.orderTickets[orderId] = { isLoading: false, tickets: [] }
    },
    nextQulotPage() {
      if (!this.isComplete) {
        this.getQulotOrdersParams.offset += this.getQulotOrdersParams.limit
      }
    },
    async fetchQulotOrders() {
      this.isLoading = true
      const { data, pending, execute } = await useAsyncQuery<{
        orders: QulotOrder[]
      }>({
        query: GET_QULOT_ORDERS,
        variables: {
          ...this.getQulotOrdersParams,
        },
        clientId: 'qulot',
      })

      if (pending.value) {
        await execute()
      }

      if (data.value && data.value.orders.length) {
        this.qulotOrders = uniqueBy(
          [...this.qulotOrders, ...data.value.orders],
          (order) => order.id
        )
        this.isComplete = false
      } else {
        this.isComplete = true
      }
      this.isLoading = false
    },
    async fetchQulotOrderDetail(orderId: string) {
      this.isLoading = true
      const { data, pending, execute } = await useAsyncQuery<{
        order: QulotOrder | null
      }>({
        query: GET_QULOT_ORDER_DETAIL,
        variables: { id: orderId },
        clientId: 'qulot',
      })

      if (pending.value) {
        await execute()
      }

      this.qulotOrderDetail = (await this.fetchOrderLineData(
        data.value?.order as QulotOrder
      )) as QulotOrder

      this.isLoading = false
    },
    async cancelQulotOrder(orderId: string) {
      this.isLoading = true
      try {
        const qulotCancelOrder = useMutation<{
          cancelOrder: QulotOrder | null
        }>(QULOT_CANCEL_ORDER, {
          variables: { orderId },
          clientId: 'qulot',
        })

        const result = await qulotCancelOrder.mutate()

        if (result?.data && result.data.cancelOrder) {
          this.qulotOrderDetail = result.data.cancelOrder
        }
      } catch (error) {
        console.log(error)

        if (error instanceof ApolloError) {
          this.error = error.graphQLErrors[0].message
        } else {
          this.error = error?.toString() as string
        }
      }
      this.isLoading = false
    },
    subscribeQulotOrder(orderId: string) {
      const { onResult, onError, start } = useSubscription<{
        order: QulotOrder | null
      }>(
        QULOT_SUBSCRIPTION_ORDER,
        {
          orderId,
        },
        {
          clientId: 'qulot',
          enabled: true,
        }
      )

      onResult(async ({ data, errors }) => {
        this.error = errors?.length ? errors[0].message : null
        if (data?.order) {
          this.qulotOrderDetail = (await this.fetchOrderLineData(
            data.order
          )) as QulotOrder
        }
      })

      onError((error) => {
        this.error = error.message
      })

      start()
    },
    async fetchOrderLineData(order?: QulotOrder) {
      if (!order?.lines) {
        return order
      }
      for (const orderLine of order.lines) {
        const { data, execute, pending } = await useAsyncQuery<{
          round?: Round
        }>({
          query: GET_ROUND_BY_ID,
          clientId: order.ethChainId.toString(),
          variables: { id: orderLine.roundId.toString() },
        })
        if (pending.value) {
          await execute()
        }

        if (data.value && data.value.round) {
          orderLine.round = data.value.round
        }
      }

      return order
    },
  },
})
