'use client'

import { motion } from 'framer-motion'
import { useAppContext } from '@/lib/app-context'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card } from '@/components/ui/card'

export default function Analytics() {
  const { analytics, tasks } = useAppContext()

  const statusDistribution = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
    { name: 'In Review', value: tasks.filter(t => t.status === 'in-review').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length },
  ]

  const priorityData = [
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
  ]

  // Weekly productivity trend data
  const weeklyTrendData = [
    { day: 'Mon', completed: 2, inProgress: 3 },
    { day: 'Tue', completed: 3, inProgress: 2 },
    { day: 'Wed', completed: 1, inProgress: 4 },
    { day: 'Thu', completed: 4, inProgress: 2 },
    { day: 'Fri', completed: 2, inProgress: 1 },
    { day: 'Sat', completed: 0, inProgress: 0 },
    { day: 'Sun', completed: 1, inProgress: 0 },
  ]

  // Assignee workload
  const assigneeData = [
    { name: 'Sarah Chen', tasks: 2 },
    { name: 'Mike Davis', tasks: 3 },
    { name: 'Emma Wilson', tasks: 2 },
    { name: 'Alex Johnson', tasks: 2 },
  ]

  const colors = ['#52b788', '#2d6a4f', '#1b4332', '#081c15']
  const priorityColors = ['#3b82f6', '#f59e0b', '#ef4444']
  const chartColors = ['#5568ff', '#52b788']

  const completionRate = analytics.totalTasks > 0 
    ? Math.round((analytics.completedTasks / analytics.totalTasks) * 100) 
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your productivity and team performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: analytics.totalTasks, icon: '📋' },
          { label: 'Completed', value: analytics.completedTasks, icon: '✅' },
          { label: 'In Progress', value: analytics.inProgressTasks, icon: '⚡' },
          { label: 'Completion Rate', value: `${completionRate}%`, icon: '📈' },
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{metric.icon}</span>
              <span className="text-xs text-muted-foreground">Today</span>
            </div>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              />
              <Bar dataKey="value" fill="#5568ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Priority Distribution */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityColors.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Productivity Trend */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Weekly Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#52b788" 
                strokeWidth={2}
                dot={{ fill: '#52b788', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="inProgress" 
                stroke="#5568ff" 
                strokeWidth={2}
                dot={{ fill: '#5568ff', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Assignee Workload */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Team Workload Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assigneeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              />
              <Bar dataKey="tasks" fill="#52b788" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tasks Completed Today</h3>
          <p className="text-3xl font-bold">{analytics.tasksCompletedToday}</p>
          <p className="text-xs text-muted-foreground mt-2">Consistent progress</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Current Streak</h3>
          <p className="text-3xl font-bold">{analytics.streak} days</p>
          <p className="text-xs text-muted-foreground mt-2">Keep it going!</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Avg Task Duration</h3>
          <p className="text-3xl font-bold">{analytics.averageTaskDuration}h</p>
          <p className="text-xs text-muted-foreground mt-2">Per task</p>
        </Card>
      </div>
    </motion.div>
  )
}

