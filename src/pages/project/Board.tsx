import { useState } from 'react'
import { tasks as initialTasks } from '../../data/mock'
import type { Task } from '../../types'
import { Avatar } from '../../components/Avatar'
import { PriorityBadge } from '../../components/PriorityBadge'
import { getMember } from '../../data/mock'

const columns: { id: Task['column']; label: string }[] = [
  { id: 'todo', label: 'To do' },
  { id: 'inprogress', label: 'In Progress' },
  { id: 'review', label: 'In Review' },
  { id: 'done', label: 'Done' },
]

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [overColumn, setOverColumn] = useState<Task['column'] | null>(null)

  const drop = (column: Task['column']) => {
    if (draggedId) {
      setTasks((prev) => prev.map((t) => (t.id === draggedId ? { ...t, column } : t)))
    }
    setDraggedId(null)
    setOverColumn(null)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Board</h1>
      <p className="mt-1 text-sm text-stone-500">Drag and drop cards between columns.</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {columns.map(({ id, label }) => {
          const columnTasks = tasks.filter((t) => t.column === id)
          return (
            <div
              key={id}
              onDragOver={(e) => {
                e.preventDefault()
                setOverColumn(id)
              }}
              onDragLeave={() => setOverColumn((c) => (c === id ? null : c))}
              onDrop={() => drop(id)}
              className={`min-h-64 rounded-xl border p-3 transition ${
                overColumn === id
                  ? 'border-stone-400 bg-stone-100'
                  : 'border-stone-200 bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between px-1 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  {label}
                </span>
                <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[11px] font-medium text-stone-600">
                  {columnTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedId(task.id)}
                    onDragEnd={() => {
                      setDraggedId(null)
                      setOverColumn(null)
                    }}
                    className={`cursor-grab rounded-lg border border-stone-200 bg-white p-3 shadow-sm transition active:cursor-grabbing ${
                      draggedId === task.id ? 'opacity-40' : 'hover:border-stone-300'
                    }`}
                  >
                    <p className="text-sm text-stone-800">{task.title}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <PriorityBadge priority={task.priority} />
                      {task.assigneeId && <Avatar member={getMember(task.assigneeId)} size="sm" />}
                    </div>
                  </div>
                ))}
                {columnTasks.length === 0 && (
                  <p className="px-1 py-4 text-xs text-stone-400">No tasks</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
