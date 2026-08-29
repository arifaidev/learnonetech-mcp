# LearnOneTech MCP

An MCP server and Cursor plugin for [LearnOneTech](https://learnonetech.com). It lets Cursor and other MCP-compatible clients search and retrieve the site's public technology, Android, mobile, FRP, apps, and troubleshooting content through the WordPress REST API.

## Features

- Search LearnOneTech articles by keyword
- Browse recent articles
- Retrieve an article by WordPress ID or slug
- List article categories
- Search public posts and pages
- Return basic site information
- Includes a dedicated `learnonetech-research` Cursor skill
- No API key required for public content
- Uses MCP over stdio

## MCP tools

| Tool | Purpose |
| --- | --- |
| `site_info` | LearnOneTech site and API information |
| `search_articles` | Search articles by keyword |
| `list_articles` | Browse recent articles |
| `get_article` | Read an article by ID or slug |
| `list_categories` | List public article categories |
| `search_site` | Search public posts and pages |

## Cursor Skill

The repository includes `learnonetech-research`, a Cursor skill that teaches the agent when and how to use the LearnOneTech MCP tools. It helps Cursor discover relevant articles, retrieve full content when necessary, preserve canonical source URLs, and distinguish retrieved LearnOneTech information from general knowledge.

Skill location:

`.cursor-plugin/skills/learnonetech-research/SKILL.md`

## Cursor installation

Install this repository as an MCP server in Cursor with:

```json
{
  "mcpServers": {
    "learnonetech": {
      "command": "npx",
      "args": ["-y", "github:arifaidev/learnonetech-mcp"]
    }
  }
}
```

The repository also includes `.cursor-plugin/plugin.json`, `mcp.json`, and `cursor-directory.json` for Cursor ecosystem discovery.

## Example prompts

- Search LearnOneTech for Samsung FRP articles.
- Find the latest Android troubleshooting articles on LearnOneTech.
- Find LearnOneTech guides for a Samsung Galaxy model.
- Read a LearnOneTech article by slug.
- List LearnOneTech categories related to Android.
- Search LearnOneTech pages for a troubleshooting topic.

## Data source

The server reads publicly available content from:

`https://learnonetech.com/wp-json/wp/v2`

The MCP is a retrieval layer. It does not authenticate users, unlock devices, or bypass security controls itself.

## Local development

Requirements: Node.js 18+

```bash
npm install
npm start
```

## Responsible use

Use device-recovery and FRP-related information only for devices you own or are authorized to service. Follow applicable laws and LearnOneTech's responsible-use guidance.

## License

MIT
