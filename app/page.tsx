import { BlogPosts } from 'app/components/posts'

export default function Page() {

  const linksClassnames = `underline decoration-neutral-600 decoration-[0.1em] underline-offset-2`;

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Mickael Daniel
      </h1>

      <p className="mb-4">Hi, I'm Mickael. You may also know me as <em>mklabs</em>.</p>

      <p className="mb-4">
        I'm an Unreal Engine gameplay &amp; tools developer living in France. I created&nbsp;
        <a className={linksClassnames} href="https://www.unrealengine.com/marketplace/en-US/product/gas-companion">GAS Companion</a>,&nbsp;
        <a className={linksClassnames} href="https://www.unrealengine.com/marketplace/en-US/product/combo-graph">Combo Graph</a> and&nbsp;
        <a className={linksClassnames} href="https://www.unrealengine.com/marketplace/en-US/product/gameplay-blueprint-attributes">Blueprint Attributes</a>&nbsp;
        plugins.
      </p>

      {/* Until clarification upon whether I'm allowed to tell as part of my bio that I was involved with Storm Sync  */}
      {/* <p className="mb-4">
        I was part of the engineering team behind the <a className={linksClassnames} href="https://dev.epicgames.com/community/learning/courses/XRV/unreal-engine-your-first-graphic-with-motion-design/Vp00/unreal-engine-motion-design-getting-started">Motion Design</a> project and the main developer of&nbsp;
        <a className={linksClassnames} href="https://dev.epicgames.com/community/learning/courses/XRV/unreal-engine-your-first-graphic-with-motion-design/JpkE/unreal-engine-using-storm-sync-to-package-your-content">Storm Sync</a>.
      </p> */}

      <p>
        I'm currently working on <a className={linksClassnames} href="https://www.moonray.game">Moonray</a>, an exciting fast paced, melee-focused multiplayer game.
      </p>

      <div className="my-8">
        <h2 className="mb-4 text-lg text-base-600 dark:text-base-500">Writing</h2>

        <BlogPosts />
      </div>
    </section>
  )
}
