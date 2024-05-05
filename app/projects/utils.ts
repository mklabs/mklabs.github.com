import fs from 'fs'
import path from 'path'
import { parse, stringify } from 'yaml'

import { readFile } from 'fs/promises'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  published?: boolean
  tags?: []
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes

    metadata[key] = value === 'true' ? true :
      value === 'false' ? false :
      // convert to array if tags
      key === 'tags' ? value.split(', ').map(s => s.trim()) :
      value;
  })

  // default to published if it's absent from frontmatter
  metadata.published = metadata.published ?? true;
  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)

  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
  // filter posts that have their frontmatter published set to false (default is true if absent)
  .filter(({ metadata }) => metadata.published)

}

export function getProjectsPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'projects', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    // month: 'long',
    // day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}

export type Project = {
  name: string,
  date: string | [string],
  description: string
  url: string
};

export async function getProjectsYaml(): Promise<{ file: any, yaml: { projects: [Project] } }> {
  const filepath = path.join(process.cwd(), 'app', 'projects', 'projects.yml');
  const file = await readFile(filepath, { encoding: 'utf-8' });
  const yaml = parse(file);

  return { file, yaml };
}