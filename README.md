# LearnOneTech MCP

An MCP server for [LearnOneTech](https://learnonetech.com) that lets Cursor and other MCP-compatible clients search the site's public technology content and retrieve articles through the WordPress REST API.

## What it does

- Search LearnOneTech articles by keyword
- Browse recent articles
- Retrieve a full article by WordPress post ID or slug
- List article categories
- Search public posts and pages
- Return basic site information
- No API key required

## MCP tools

| Tool | Purpose |
| --- | --- |
| `site_info` | LearnOneTech site and API information |
| `search_articles` | Search articles by keyword |
| `list_articles` | Browse recent articles |
| `get_article` | Read an article by ID or slug |
| `list_categories` | List public article categories |
| `search_site` | Search public posts and pages |

## Cursor Directory

The repository includes both `.cursor-plugin/plugin.json` and `mcp.json` so Cursor/cursor.directory can detect the MCP server.

Submit the repository here:

https://cursor.directory/plugins/new?type=mcp_server

Cursor supports community MCP servers through cursor.directory, and custom MCP servers can also be configured in `mcp.json`.

## Manual Cursor configuration

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

## Local development

Requirements: Node.js 18+

```bash
npm install
npm start
```

The server uses stdio and reads LearnOneTech's public WordPress API at `https://learnonetech.com/wp-json/wp/v2`.

## Example prompts

- "Search LearnOneTech for Samsung FRP articles."
- "Find the latest Android troubleshooting articles on LearnOneTech."
- "Read the LearnOneTech article with slug `example-slug`."
- "List the categories available on LearnOneTech."

## Responsible use

LearnOneTech contains device-recovery and FRP-related material. Use device-recovery guidance only for devices you own or are authorized to service. This MCP server only retrieves publicly available website content; it does not authenticate users or bypass device security itself.

## License

MIT
