import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, members } from '../data/mock'
import { Avatar } from '../components/Avatar'

type SortKey = 'recent' | 'name'
type SortDir = 'asc' | 'desc'

export default function Home() {
  const [sortKey, setSortKey] = useState<SortKey>('recent')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    const list = [...projects]
    list.sort((a, b) =>
      sortKey === 'name'
        ? a.title.localeCompare(b.title)
        : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime(),
    )
    if (sortDir === 'asc') list.reverse()
    return list
  }, [sortKey, sortDir])

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight text-stone-900">ProgressTracker</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500">Ava Chen</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-700 text-xs font-medium text-white">
              AC
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Projects</h1>
            <p className="mt-1 text-sm text-stone-500">Everything your team is working on.</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700 shadow-sm focus:outline-none"
            >
              <option value="recent">Recent activity</option>
              <option value="name">Name</option>
            </select>
            <button
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700 shadow-sm hover:bg-stone-100"
              title={sortDir === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <Link
              key={p.id}
              to={`/project/${p.id}`}
              className="group rounded-xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300 hover:shadow-md"
            >
              {p.image ? (
                <img src={p.image} alt="" className="h-36 w-full rounded-t-xl object-cover" />
              ) : (
                <div className="flex h-36 w-full items-center justify-center rounded-t-xl bg-stone-100 text-sm text-stone-400">
                  No image
                </div>
              )}
              <div className="p-4">
                <h2 className="font-medium text-stone-900 group-hover:underline">{p.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-stone-500">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {p.memberIds.slice(0, 4).map((id) => {
                      const m = members.find((mm) => mm.id === id)!
                      return <Avatar key={id} member={m} size="sm" />
                    })}
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(p.lastModified).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
