// wagmiConfig.js
import { configureChains, createClient } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { InjectedConnector } from 'wagmi/connectors/injected'

const { chains, provider } = configureChains([sepolia], [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'MyDApp',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors: () => [
    new InjectedConnector({ chains }),
    ...connectors,
  ],
  provider,
})

export { wagmiClient, chains }
