# Docusaurus Deploy Reference

## Configuration

### docusaurus.config.js
```js
module.exports = {
  title: 'LearnFlow',
  tagline: 'AI-Powered Python Tutoring',
  url: 'https://docs.learnflow.io',
  baseUrl: '/',
  organizationName: 'learnflow',
  projectName: 'docs',
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/learnflow/docs/edit/main/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'LearnFlow',
      items: [
        { type: 'doc', docId: 'intro', position: 'left', label: 'Docs' },
        { href: 'https://github.com/learnflow', label: 'GitHub', position: 'right' },
      ],
    },
  },
};
```

## Directory Structure

```
docs-site/
├── docs/
│   ├── intro.md
│   ├── getting-started.md
│   ├── architecture.md
│   └── agents/
│       ├── triage.md
│       ├── concepts.md
│       └── debug.md
├── src/
│   ├── css/
│   │   └── custom.css
│   └── pages/
│       └── index.js
├── static/
│   └── img/
├── docusaurus.config.js
├── sidebars.js
└── package.json
```

## Deployment Options

### Option 1: ConfigMap (simple, small sites)
- Build static files into ConfigMap
- Mount into nginx container
- Good for sites < 1MB

### Option 2: Docker image (recommended)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

### Option 3: GitHub Pages
```bash
npm run deploy
```

## Search Configuration

### Algolia DocSearch
```js
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
    indexName: 'learnflow',
  },
}
```

### Local Search (no external service)
```bash
npm install @easyops-cn/docusaurus-search-local
```

## Troubleshooting

### ConfigMap too large
- Kubernetes ConfigMaps limited to 1MB
- Use Docker image approach for larger sites
- Or split into multiple ConfigMaps

### Build failures
- Check Node.js version compatibility
- Verify all markdown files are valid
- Run `npm run build` locally first
