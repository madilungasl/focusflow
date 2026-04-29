'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '@/lib/app-context'
import { Task, TaskStatus } from '@/lib/types'
import TaskCard from './task-card'
import TaskModal from './task-modal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const STATUSES: { value: TaskStatus; label: string; color: string }[] = [
  { value: 'todo', label: 'To Do', color: 'bg-slate-500' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
  { value: 'in-review', label: 'In Review', color: 'bg-amber-500' },
  { value: 'done', label: 'Done', color: 'bg-green-500' },
]

export default function KanbanBoard() {
  const { tasks, updateTask } = useAppContext()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(t => t.status === status)
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask) {
      updateTask({ ...draggedTask, status })
      setDraggedTask(null)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Kanban Board</h1>
        <p className="text-muted-foreground">Organize and manage your tasks across different stages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATUSES.map(status => (
          <motion.div
            key={status.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: STATUSES.indexOf(status) * 0.1 }}
            className="bg-card border border-border rounded-lg p-4 min-h-96 flex flex-col"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status.value)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <h3 className="font-semibold">{status.label}</h3>
              <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {getTasksByStatus(status.value).length}
              </span>
            </div>

            <div className="space-y-3 flex-1">
              <AnimatePresence>
                {getTasksByStatus(status.value).map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onClick={() => setSelectedTask(task)}
                  >
                    <TaskCard task={task} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 justify-start gap-2"
            >
              <Plus size={16} />
              Add Task
            </Button>
          </motion.div>
        ))}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  )
}
