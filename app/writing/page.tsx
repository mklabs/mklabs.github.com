import { BlogPosts } from 'app/components/posts'
import { title } from 'app/vars'

export const metadata = {
  title: 'Writing',
  description: `Ideas, notes and projects by ${title}`,
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Writing</h1>
      <BlogPosts />
    </section>
  )
}
