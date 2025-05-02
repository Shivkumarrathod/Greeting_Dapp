'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useContractRead, useContractWrite } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors'
import { contractAddress, abi } from '../contract'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  const [newGreeting, setNewGreeting] = useState('')
  const { address, isConnected } = useAccount()
  
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const { data: greeting } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'getGreeting',
    watch: true,
  })

  const { write, isLoading, isSuccess } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'setGreeting',
  })

  const handleSetGreeting = () => {
    if (!newGreeting) return
    write({ args: [newGreeting] })
  }

  return (
    <main className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Greeting DApp</h1>

      <ConnectButton />
      
      {isConnected && (
        <div className="mb-4">
          <p className="text-sm">Connected as: {address}</p>
          <button
            onClick={disconnect}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
        </div>
      )}

      <p className="text-lg mb-4">
        Current Greeting: <strong>{greeting}</strong>
      </p>

      <input
        type="text"
        value={newGreeting}
        onChange={(e) => setNewGreeting(e.target.value)}
        placeholder="Enter new greeting"
        className="p-2 border w-full mb-4"
      />
      <button
        onClick={handleSetGreeting}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!isConnected || isLoading}
      >
        {isLoading ? 'Confirm in Wallet...' : 'Set Greeting'}
      </button>

      {isSuccess && (
        <p className="text-green-600 mt-2">Greeting updated successfully!</p>
      )}
    </main>
  )
}
