export interface User {
  id: string
  totalWinAmount: string
  totalTickets: string
  totalAmount: string
}

export interface QulotUser {
  id: string
  firstName: string
  lastName?: string
  email: string
  picture: string
  ethAccount?: QulotEthAccount
  isConfirmed: boolean
}

export interface QulotJwtToken {
  accessToken: string
  refreshToken: string
  expiresAt: string
}

export interface QulotEthAccount {
  id: string
  address: string
}

export interface RegisterQulotUser {
  firstName: string
  lastName?: string
  email: string
  password: string
}