import Link from 'next/link'
import { formatDate, getProjectsPosts, getProjectsYaml } from 'app/projects/utils'
import isAbsoluteUrl from 'is-absolute-url';
import { CustomMDX } from 'app/components/mdx'

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

export async function YamlProjectsList() {
  let { file, yaml } = await getProjectsYaml()
  const { projects } = yaml;

  const linksClassnames = `underline decoration-neutral-600 decoration-1 underline-offset-2 hover:text-base-500 hover:decoration-base-600 dark:hover:text-base-300`;

  const reduceMax = (res, date) => (Math.max(res, parseInt(date, 10)));

  return (
    <div>
      {projects
        .sort((a, b) => {
          const aDate = Array.isArray(a.date) ? a.date.reduce(reduceMax, 0) : a.date;
          const bDate = Array.isArray(b.date) ? b.date.reduce(reduceMax, 0) : b.date;
          
          if (
            new Date(aDate) > new Date(bDate)
          ) {
            return -1
          }
          return 1
        })
        .map(({ name, date, url, description }) => (
          <>
            <div className="py-2 border-b border-base-900">
              <div className="flex align-baseline">
                <div className="text-neutral-600 dark:text-neutral-400 min-w-28 text-sm">
                  {Array.isArray(date) ? date.join(' - ') : date}
                </div>

                <div>
                  <div className="text-black dark:text-neutral-100">
                    <Link
                      key={url}
                      className={linksClassnames}
                      href={url}
                    >
                      {name} {isAbsoluteUrl(url) && `↗`}
                    </Link>
                  </div>

                  <div className="text-base-600 dark:text-base-500 text-sm leading-6 pt-1">
                    <CustomMDX source={description} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  )
}
