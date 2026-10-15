import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { progressPosts, getMember, getProject } from '../../data/mock'
import { Avatar } from '../../components/Avatar'
import { MessageCircle } from 'lucide-react'

export default function ProgressUpdates() {
  const { projectId } = useParams()
  const project = getProject(projectId)!
  const [posts, setPosts] = useState(progressPosts)
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const addComment = (postId: string) => {
    const text = (drafts[postId] ?? '').trim()
    if (!text) return
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: crypto.randomUUID(), authorId: 'm1', text, time: 'just now' },
              ],
            }
          : p,
      ),
    )
    setDrafts((d) => ({ ...d, [postId]: '' }))
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Progress updates</h1>
        <p className="mt-1 text-sm text-stone-500">
          Latest progress on {project.title} shared by the team.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-stone-200 bg-white p-5">
            <header className="flex items-center gap-3">
              <Avatar member={getMember(post.authorId)} />
              <div>
                <div className="text-sm font-medium text-stone-900">{post.title}</div>
                <div className="text-xs text-stone-400">
                  {getMember(post.authorId).name} · {post.time}
                </div>
              </div>
            </header>

            <p className="mt-3 text-sm leading-relaxed text-stone-600">{post.description}</p>

            {post.photos.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {post.photos.map((src, i) => (
                  <img key={i} src={src} alt="" className="h-44 w-full rounded-lg border border-stone-200 object-cover" />
                ))}
              </div>
            )}

            <div className="mt-5 border-t border-stone-100 pt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                <MessageCircle className="h-3.5 w-3.5" />
                {post.comments.length} comments
              </div>
              <ul className="mt-3 space-y-3">
                {post.comments.map((c) => {
                  const author = getMember(c.authorId)
                  return (
                    <li key={c.id} className="flex items-start gap-3">
                      <Avatar member={author} size="sm" />
                      <div className="min-w-0">
                        <div className="text-xs text-stone-400">
                          <span className="font-medium text-stone-700">{author.name}</span> · {c.time}
                        </div>
                        <p className="mt-0.5 text-sm text-stone-600">{c.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 flex gap-2">
                <input
                  value={drafts[post.id] ?? ''}
                  onChange={(e) => setDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                  placeholder="Write a comment…"
                  className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300"
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
                >
                  Send
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 text-xs text-stone-400">
        Return to{' '}
        <Link to={`/project/${project.id}`} className="underline hover:text-stone-600">
          project home
        </Link>
        .
      </p>
    </div>
  )
}
