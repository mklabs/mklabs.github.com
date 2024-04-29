import Link from 'next/link'
import { formatDate, getProjectsPosts } from 'app/projects/utils'

export function ProjectsPosts() {
  let allProjects = getProjectsPosts()

  const linksClassnames = `underline decoration-neutral-600 decoration-1 underline-offset-2 hover:text-base-500 hover:decoration-base-600 dark:hover:text-base-300`;

  return (
    <div>
      {allProjects
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <>
            <div className="py-2 border-b border-base-900">
              <div className="flex align-baseline">
                <div className="text-neutral-600 dark:text-neutral-400 min-w-24">
                  {formatDate(post.metadata.publishedAt, false)}
                </div>

                <div>
                  <div className="text-black dark:text-neutral-100">
                    <Link
                      key={post.slug}
                      className={linksClassnames}
                      href={`/projects/${post.slug}`}
                    >
                      {post.metadata.title}
                    </Link>
                  </div>

                  <div className="text-base-600 dark:text-base-500 text-sm leading-5 pt-1">
                    {post.metadata.summary}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  )
}
