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

      <p className="mb-4">
        I was part of the engineering team behind the <a className={linksClassnames} href="https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5.4-release-notes">Motion Design</a> project and the main developer of Storm Sync.
      </p>

      <p>
        I'm currently working on <a className={linksClassnames} href="https://www.moonray.game">Moonray</a>, an exciting fast paced, melee-focused multiplayer game.
      </p>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
