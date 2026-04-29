'use client'

import { Task } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Clock, AlertCircle } from 'lucide-react'

interface TaskCardProps {
  task: Task
}

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export default function TaskCard({ task }: TaskCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'

  return (
    <div className="bg-card border border-border hover:border-primary/50 rounded-lg p-3 cursor-move hover:shadow-md transition-all group">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm line-clamp-2 text-foreground">
            {task.title}
          </h4>
          {isOverdue && (
            <AlertCircle size={16} className="text-destructive flex-shrink-0" />
          )}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className={`text-xs ${PRIORITY_COLORS[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          {task.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={14} />
            {task.estimatedHours}h
          </div>
          <Avatar className="h-6 w-6 bg-primary text-primary-foreground flex items-center justify-center text-xs">
            <AvatarFallback>
              {getInitials(task.assignee)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
