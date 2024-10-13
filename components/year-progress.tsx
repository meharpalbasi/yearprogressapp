'use client'

import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

export function YearProgress() {
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 1)
      const end = new Date(now.getFullYear() + 1, 0, 1)
      const elapsed = now.getTime() - start.getTime()
      const total = end.getTime() - start.getTime()
      const percentage = (elapsed / total) * 100
      setProgress(percentage)

      const diff = end.getTime() - now.getTime()
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(`${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [])

  const totalWeeks = 52;
  const currentWeek = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 7));

  const squares = Array.from({ length: totalWeeks }, (_, index) => {
    return (
      <div
        key={index}
        className={`w-3 h-3 rounded-full ${index < currentWeek ? 'bg-black' : 'bg-primary/20'}`}
      />
    )
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-8">Year Progress</h1>
      <Progress value={progress} className="w-full max-w-md mb-4" />
      <p className="text-2xl font-mono mb-8">{progress.toFixed(2)}% of year completed</p>
      <div className="grid grid-cols-8 gap-2 mb-8">{squares}</div>
      <p className="text-xl text-center">
        Time left: {timeLeft}
      </p>
    </div>
  )
}
