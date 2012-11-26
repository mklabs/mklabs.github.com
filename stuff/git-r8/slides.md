
## git workflow

<style>
body pre {
  background-color: hsl(0, 0%, 97%);
  border: 1px solid hsl(0, 0%, 80%);
  font-size: 24px;
  line-height: 19px;
  padding: 0;
  border-radius: 3px;
  overflow-x: auto;
  white-space: pre;
  word-wrap: normal;
  width: auto;
}

body pre code {
  margin: 0;
  padding: 16px;
  background-color: transparent;
  border: none;
  overflow-x: auto;
  font-family: Consolas, "Liberation Mono", Courier, monospace;
}
</style>

> on r8 colibri

**Resources**:

- http://git-scm.com/book/ch8-2.html
- http://git-scm.com/docs/git-svn
- `git help svn`
- http://nvie.com/posts/a-successful-git-branching-model/
- http://git-scm.com/book/en/Git-Branching-Branching-Workflows
- http://john.albin.net/git/convert-subversion-to-git

---

**http://git-scm.com/book/ch8-2.html#Subversion**

>  you can easily use those instructions to git svn clone a repository; then,
>  stop using the Subversion server, push to a new Git server, and start using
>  that.

## Goal of the meeting.

- Explain the Git setup
- Discuss about our workflow
- Refine
- Rince & Repeat

## tl;dr

On each dev desktop

1. install git (yum install ...)
2. Clone from svn repo (using git-svn) with the [authors
   file](http://wiki.corp.kelkoo.net/foswiki/pub/EUMarketPlaceEngineering/R8MobilePrototype/authors-transform.txt)
3. Configure the gitlab remote `git@dc1-ci-dev-gitlab-01.dev.dc1.kelkoo.net:r8-colibri.git`
4. use it !!!

## 1. Install Git

Most of you have it already.

If not

```sh
yum install git
```

## 2. Clone repo using authors file

First problem is the author information.

We need to map SVN committer name to better Git author data.

We have generated the authors files, get it locally:

    curl http://wiki.corp.kelkoo.net/foswiki/pub/EUMarketPlaceEngineering/R8MobilePrototype/authors-transform.txt  -o /tmp/authors.txt

then:

    git svn clone http://subversion.corp.kelkoo.net/svn/engineering/R8/colibri/trunk colibri --authors-file=/tmp/authors.txt

## 3. Add the new gitlab remote

    git remote add gitlab git@dc1-ci-dev-gitlab-01.dev.dc1.kelkoo.net:r8-colibri.git

You can now fetch / pull / push from and to this new remote.

## Use it.

<br />

**Just Do It™**

## You're all set

So the idea is to:

- use the Gitlab repo as the main development repository (git fetch / push here)

- A jenkins job takes care of synchronizing the Gitlab repo (master branch) <=> SVN Trunk.
  - (for now, this still requires a manual `git svn dcommit` from someone in the team)

- Master is the stable branch (SVN Trunk equivalent)
 - Next release

- Development is usually done in [topic branches](http://git-scm.com/book/en/Git-Branching-Branching-Workflows#Topic-Branches)

- For important development, use Gitlab Merge Request feature. Ask for review. Merge the branch eventually.

## Discuss!
