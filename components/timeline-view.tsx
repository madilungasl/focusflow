'use client'

import { motion } from 'framer-motion'
import { useAppContext } from '@/lib/app-context'
import { Task } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function TimelineView() {
  const { tasks } = useAppContext()
  const [currentWeek, setCurrentWeek] = useState(0)

  // Get all tasks sorted by due date
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  // Group tasks by date
  const groupedTasks = sortedTasks.reduce((acc, task) => {
    const date = task.dueDate
    if (!acc[date]) acc[date] = []
    acc[date].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  const dateKeys = Object.keys(groupedTasks).sort()

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Timeline View</h1>
        <p className="text-muted-foreground">Visualize your tasks across time</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <div className="min-w-max p-6">
          {dateKeys.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tasks scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dateKeys.map((date, idx) => (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex gap-4 items-start"
                >
                  {/* Date Header */}
                  <div className="w-32 flex-shrink-0 pt-2">
                    <div className="text-sm font-semibold">{formatDate(date)}</div>
                    <div className="text-xs text-muted-foreground">{formatDayOfWeek(date)}</div>
                  </div>

                  {/* Tasks for this date */}
                  <div className="flex-1 space-y-2">
                    {groupedTasks[date].map((task, taskIdx) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (idx * 0.05) + (taskIdx * 0.02) }}
                        className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">{task.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.estimatedHours}h
                            </Badge>
                            <span className="text-xs text-muted-foreground">{task.assignee}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

