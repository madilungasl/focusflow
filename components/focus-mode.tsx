'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '@/lib/app-context'
import { Task } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

const POMODORO_DURATION = 25 * 60 // 25 minutes in seconds

export default function FocusMode() {
  const { tasks, startFocusSession, endFocusSession, focusSessions } = useAppContext()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(focusSessions.length)

  const inProgressTasks = tasks.filter(t => t.status === 'in-progress')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      if (selectedTask) {
        endFocusSession(`session-${Date.now()}`)
      }
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, selectedTask, endFocusSession])

  const handleStart = () => {
    if (selectedTask && !isRunning) {
      startFocusSession(selectedTask.id)
      setIsRunning(true)
    }
  }

  const handleReset = () => {
    setTimeLeft(POMODORO_DURATION)
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progress = ((POMODORO_DURATION - timeLeft) / POMODORO_DURATION) * 100

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Focus Mode</h1>
        <p className="text-muted-foreground">Get into the zone with the Pomodoro technique</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-96"
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Circular Progress */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${(2 * Math.PI * 120 * progress) / 100} ${2 * Math.PI * 120}`}
                className="text-primary transition-all"
                initial={{ strokeDasharray: 0 }}
                animate={{ strokeDasharray: `${(2 * Math.PI * 120 * progress) / 100} ${2 * Math.PI * 120}` }}
              />
            </svg>

            {/* Timer Display */}
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {formatTime(timeLeft)}
              </div>
              {selectedTask && (
                <p className="text-sm text-muted-foreground">
                  {selectedTask.title}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              size="lg"
              onClick={handleStart}
              disabled={!selectedTask || isRunning}
              className="gap-2"
            >
              <Play size={20} />
              Start
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsRunning(!isRunning)}
              disabled={!isRunning}
              className="gap-2"
            >
              <Pause size={20} />
              Pause
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </Button>
          </div>
        </motion.div>

        {/* Task Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Select Task</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {inProgressTasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTask?.id === task.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-medium text-sm line-clamp-1">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.estimatedHours}h estimated</p>
                </button>
              ))}
              {inProgressTasks.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No in-progress tasks. Start one first!
                </p>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Today&apos;s Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Focus Sessions</span>
                <span className="font-semibold">{completedSessions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Focus Time</span>
                <span className="font-semibold">{Math.round(completedSessions * 25)}min</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
