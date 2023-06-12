import { UserRejectedRequestError } from '@wagmi/core'
import { BigNumber } from 'ethers/lib/ethers'
import { formatUnits } from 'ethers/lib/utils.js'
import { defineStore } from 'pinia'
import { GET_ROUNDS_BY_IDS } from '~~/apollo/queries'
import { Round } from '~~/types/lottery'
import { CartItemsGroup, CartTicket } from '~~/types/ticket'
import { groupBy } from '~~/utils/collection'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      tickets: [] as CartTicket[],
      buyTicketsLoading: false as boolean,
      buyTicketsError: null as string | null,
    }
  },
  getters: {
    ticketsRoundIsOpen: (state) =>
      state.tickets.filter((ticket) => ticket.round?.status === 'Open'),
    ticketsSelected: (state) =>
      state.tickets.filter((ticket) => ticket.selected),
    validTickets: (state) =>
      state.tickets.filter(
        (ticket) => ticket.selected && ticket.round?.status === 'Open'
      ),
    ticketsGroupByLotteryId() {
      const validTickets = this.validTickets as CartTicket[]
      return groupBy(validTickets, (ticket) => ticket.lotteryId)
    },
    ticketsSummaryByLotteryId() {
      const cartItems: CartItemsGroup[] = []
      if (this.ticketsGroupByLotteryId) {
        const lotteryStore = useLotteryStore()
        const { token } = useQulot()
        for (const lotteryId of Object.keys(this.ticketsGroupByLotteryId)) {
          if (lotteryStore.lotteryAsKeys[lotteryId]) {
            const lotteryPricePerTicket =
              lotteryStore.lotteryTicketPrices[lotteryId]
            cartItems.push({
              lotteryId,
              qty: this.ticketsGroupByLotteryId[lotteryId].length,
              lotteryVerboseName:
                lotteryStore.lotteryAsKeys[lotteryId].verboseName,
              lotteryPricePerTicket: formatUnits(
                lotteryPricePerTicket,
                token.value?.decimals
              ),
              total: formatUnits(
                BigNumber.from(lotteryPricePerTicket).mul(
                  this.ticketsGroupByLotteryId[lotteryId].length
                ),
                token.value?.decimals
              ),
            })
          }
        }
      }
      return cartItems
    },
    totalAmount() {
      const lotteryStore = useLotteryStore()
      const validTickets = this.validTickets as CartTicket[]
      const totalAmount = validTickets.reduce(
        (previousValue: BigNumber, ticket: CartTicket) =>
          previousValue.add(
            BigNumber.from(
              lotteryStore.lotteryAsKeys[ticket.lotteryId]?.pricePerTicket ||
                '0'
            )
          ),
        BigNumber.from('0')
      )

      return totalAmount
    },
    finalAmount() {
      const lotteryStore = useLotteryStore()
      const validTickets = this.validTickets as CartTicket[]
      let finalAmount = BigNumber.from('0')

      for (const ticket of validTickets) {
        let ticketPrice = BigNumber.from(
          lotteryStore.lotteryTicketPrices[ticket.lotteryId]
        )
        const discountPercent = lotteryStore.lotteryDiscounts[ticket.lotteryId]

        if (!discountPercent.isZero()) {
          ticketPrice = ticketPrice.sub(
            ticketPrice.mul(discountPercent).div(BigNumber.from(100))
          )
        }

        finalAmount = finalAmount.add(ticketPrice)
      }

      return finalAmount
    },
    totalDiscountPercent() {
      const lotteryStore = useLotteryStore()
      const validTickets = this.validTickets as CartTicket[]
      const ticketsGroupByLotteryId = groupBy(
        validTickets,
        (ticket) => ticket.lotteryId
      )
      return Object.keys(ticketsGroupByLotteryId).reduce(
        (previousValue: BigNumber, lotteryId: string) =>
          previousValue.add(lotteryStore.lotteryDiscounts[lotteryId]),
        BigNumber.from('0')
      )
    },
    isInsufficientTokenBalance() {
      const { tokenBalance } = useAccount()
      if (tokenBalance.value && this.finalAmount) {
        return BigNumber.from(tokenBalance.value.value).lt(this.finalAmount)
      }
      return false
    },
    isAllowCheckout() {
      return this.validTickets.length > 0 && !this.isInsufficientTokenBalance
    },
  },
  actions: {
    saveLocalStorage() {
      localStorage.setItem('cart.tickets', JSON.stringify(this.tickets))
    },
    loadLocalStorage() {
      const cartTicketsJson = localStorage.getItem('cart.tickets')
      if (cartTicketsJson) {
        const tickets: CartTicket[] = JSON.parse(cartTicketsJson)
        this.tickets = [...tickets]
        this.loadRoundData()
      }
    },
    addTickets(tickets: CartTicket[]) {
      this.tickets.push(...tickets)
      this.saveLocalStorage()
      this.loadRoundData()
    },
    toggleSelect(ticketId: number) {
      const ticket = this.tickets.find((ticket) => ticket.id === ticketId)
      if (ticket) {
        ticket.selected = !ticket.selected
        this.saveLocalStorage()
      }
    },
    remove(ticketId: number) {
      const ticketIndex = this.tickets.findIndex(
        (ticket) => ticket.id === ticketId
      )
      if (ticketIndex > -1) {
        this.tickets.splice(ticketIndex, 1)
        this.saveLocalStorage()
      }
    },
    async loadRoundData() {
      const roundIds = uniqueBy(this.tickets.map((ticket) => ticket.roundId))

      if (roundIds.length) {
        const { chainId } = useEthers()
        const { data } = await useAsyncQuery<{
          rounds: Round[]
        }>({
          query: GET_ROUNDS_BY_IDS,
          clientId: chainId.value.toString(),
          variables: {
            ids: roundIds,
          },
        })

        if (data.value && data.value.rounds.length) {
          const roundsAsKey = keyBy(data.value.rounds, (round) => round.id)
          for (const ticket of this.tickets) {
            if (roundsAsKey[ticket.roundId]) {
              ticket.round = roundsAsKey[ticket.roundId]
            }
          }
        }
      }
    },
    clear() {
      this.tickets = []
      this.buyTicketsLoading = false
      this.buyTicketsError = null
      this.saveLocalStorage()
    },
    async buyTickets() {
      let isSuccess = false
      this.buyTicketsLoading = true
      const { token, qulotAddress, writeQulotLottery, writeToken, readToken } =
        useQulot()
      const { address } = useAccount()
      if (address.value && token.value && qulotAddress.value) {
        const processBuyTicket = async () => {
          const ticketsMapPerRounds = this.validTickets.reduce(
            (res, ticket) => ({
              rounds: [...res.rounds, ticket.roundId],
              tickets: [...res.tickets, ticket.pickNumbers],
            }),
            {
              rounds: [],
              tickets: [],
            } as {
              rounds: string[]
              tickets: number[][]
            }
          )
          console.log(`[buyTickets] Process buy tickets: `, ticketsMapPerRounds)
          const result = await (
            await writeQulotLottery('buyTicketsMultiRounds', [
              ticketsMapPerRounds.rounds,
              ticketsMapPerRounds.tickets,
            ])
          )?.wait()

          console.log(`[buyTickets] Process buy tickets result: `, result)

          this.buyTicketsError = null
          return result?.status === 1
        }

        const approveBuyTicket = async () => {
          const approveResult = await (
            await writeToken('approve', [qulotAddress.value, this.totalAmount])
          )?.wait()

          console.log(
            `[buyTickets] Approve amount: ${this.totalAmount.toNumber()}, result: `,
            approveResult
          )

          return approveResult?.status === 1
        }

        const checkAllowance = async () => {
          const allowance = await readToken<BigNumber>('allowance', [
            address.value,
            qulotAddress.value,
          ])

          const isAllow = allowance.gte(this.finalAmount)

          console.log(
            `[buyTickets] Check token allowance: ${allowance.toNumber()}, is allow: ${isAllow}`
          )

          return isAllow
        }

        try {
          if (await checkAllowance()) {
            isSuccess = await processBuyTicket()
          } else {
            if ((await approveBuyTicket()) && (await checkAllowance())) {
              isSuccess = await processBuyTicket()
            }
          }
        } catch (buyTicketsTxError: any) {
          console.log(buyTicketsTxError)

          if (buyTicketsTxError?.error?.data?.message) {
            this.buyTicketsError = buyTicketsTxError?.error?.data?.message
          }

          if (buyTicketsTxError instanceof UserRejectedRequestError) {
            this.buyTicketsError = buyTicketsTxError.message
          }
        }
      }
      this.buyTicketsLoading = false
      return isSuccess
    },
  },
})
