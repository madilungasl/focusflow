'use client'

import { useState } from 'react'
import { Task } from '@/lib/types'
import { useAppContext } from '@/lib/app-context'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Trash2 } from 'lucide-react'

interface TaskModalProps {
  task: Task
  onClose: () => void
}

export default function TaskModal({ task, onClose }: TaskModalProps) {
  const { updateTask, deleteTask } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = () => {
    deleteTask(task.id)
    onClose()
  }

  const handleStatusChange = (newStatus: any) => {
    updateTask({ ...task, status: newStatus })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-card border border-border rounded-xl shadow-xl max-w-2xl w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Status</p>
            <select
              value={task.status}
              onChange={e => handleStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Priority</p>
            <div className="text-sm capitalize px-3 py-2 border border-border rounded-lg bg-card">
              {task.priority}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Assignee</p>
            <div className="text-sm px-3 py-2 border border-border rounded-lg bg-card">
              {task.assignee}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Due Date</p>
            <div className="text-sm px-3 py-2 border border-border rounded-lg bg-card">
              {task.dueDate}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">Estimated Hours</p>
            <div className="text-sm px-3 py-2 border border-border rounded-lg bg-card">
              {task.estimatedHours}h
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {task.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border">
          <Button
            variant="default"
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
