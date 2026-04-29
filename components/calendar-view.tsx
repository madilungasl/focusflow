'use client'

import { motion } from 'framer-motion'
import { useAppContext } from '@/lib/app-context'
import { Task } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function CalendarView() {
  const { tasks } = useAppContext()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 29)) // April 2026

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getTasksForDate = (day: number | null) => {
    if (!day) return []
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString()
      .split('T')[0]
    return tasks.filter(t => t.dueDate === dateStr)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-amber-500'
      case 'low':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Calendar View</h1>
        <p className="text-muted-foreground">Plan your tasks with a calendar interface</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{monthName}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={previousMonth}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dayTasks = day ? getTasksForDate(day) : []
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.02 }}
                className={`aspect-square p-2 rounded-lg border ${
                  day ? 'border-border bg-muted/30 hover:bg-muted/60' : 'border-transparent'
                } transition-colors`}
              >
                {day && (
                  <div className="h-full flex flex-col">
                    <div className="text-sm font-semibold mb-1">{day}</div>
                    <div className="flex-1 overflow-hidden space-y-1">
                      {dayTasks.slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${getPriorityColor(task.priority)}`}
                          title={task.title}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayTasks.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Task List for Selected Date */}
      {getTasksForDate(currentDate.getDate()).length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Tasks for {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h3>
          <div className="space-y-3">
            {getTasksForDate(currentDate.getDate()).map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)} mt-1.5`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">{task.assignee}</Badge>
                    <Badge variant="outline" className="text-xs">{task.estimatedHours}h</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
