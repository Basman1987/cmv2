"use client"

import { useQuery } from "react-query"
import { motion } from "framer-motion"

const fetchCryptoData = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=crypto-com-chain&vs_currencies=usd&include_24hr_change=true",
    {
      headers: {
        Accept: "application/json",
      },
    },
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function CryptoData() {
  const { data, isLoading, error } = useQuery("cryptoData", fetchCryptoData, {
    refetchInterval: 60000,
    retry: 3,
    retryDelay: 1000,
  })

  if (isLoading) return <div className="text-center py-20">Loading CRONOS data...</div>
  if (error) return <div className="text-center py-20">Error fetching CRONOS data. Please try again later.</div>

  const cronosData = data?.["crypto-com-chain"]

  if (!cronosData) return <div className="text-center py-20">No CRONOS data available at the moment.</div>

  return (
    <section className="py-20 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
        CRONOS Live Data
      </h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg sm:text-xl font-bold">CRONOS</span>
          <span className="text-xl sm:text-2xl font-bold">${cronosData.usd.toFixed(3)}</span>
        </div>
        <div
          className={`text-right text-sm sm:text-base ${cronosData.usd_24h_change > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {cronosData.usd_24h_change.toFixed(3)}% (24h)
        </div>
      </motion.div>
    </section>
  )
}

