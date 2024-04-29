# mklabs.github.io

Content for personal website at https://mklabs.github.io

```
$ npm run dev
  Starts the development server.

$ npm run build
  Builds the app for production.

$ npm start
    Runs the built app in production mode.
```

## Notes

List of file to changes if baseURL for blog post is changed:

- app/rss/route.ts
- app/writing/[slug]/page.tsx
- app/sitemap.ts
- app/components/posts.tsx
- app/components/nav.tsx
- app/writing/utils.ts (if containing folder under app/ is changed)