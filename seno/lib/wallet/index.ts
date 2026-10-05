export type WalletSnapshot = { balance: number; currency: string }
export type WalletAdapter = { getWallet: () => WalletSnapshot; setBalance: (balance: number) => void }
export const mockWalletAdapter: WalletAdapter = {
  getWallet: () => ({ balance: 2450, currency: 'EGP' }),
  setBalance: () => undefined,
}
