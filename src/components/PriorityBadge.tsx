import type { Priority } from '../types'

const config: Record<Priority, { label: string; cls: string }> = {
  low: { label: 'Low', cls: 'bg-stone-100 text-stone-600 border-stone-200' },
  medium: { label: 'Medium', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  high: { label: 'High', cls: 'bg-rose-50 text-rose-700 border-rose-200' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, cls } = config[priority]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>
      {label}
    </span>
  )
}
