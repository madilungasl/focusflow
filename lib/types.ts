export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  dueDate: string
  estimatedHours: number
  completedAt?: string
  tags: string[]
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'manager' | 'member'
}

export interface FocusSession {
  id: string
  taskId: string
  startTime: string
  endTime?: string
  duration: number // in minutes
  completed: boolean
}

export interface TeamAnalytics {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  totalFocusTime: number // in minutes
  averageTaskDuration: number
  tasksCompletedToday: number
  streak: number
}
