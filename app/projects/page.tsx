import { ProjectsPosts } from 'app/components/projects'
import { title } from 'app/vars'

export const metadata = {
  title: 'Projects',
  description: `Ideas, notes and projects by ${title}`,
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Projects</h1>
      <ProjectsPosts />
    </section>
  )
}
