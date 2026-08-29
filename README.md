# Learn One Tech MCP

An MCP server for [Learn One Tech](https://learnonetech.com) that lets Cursor and other MCP-compatible clients search the site's public technology content and retrieve articles through the WordPress REST API.

## Features

- Search Learn One Tech articles by keyword
- List recent articles with pagination
- Retrieve a full article by post ID or slug
- List article categories
- Search posts and pages
- Get basic site information
- No API key required

## MCP tools

| Tool | Purpose |
| --- | --- |
| `site_info` | Learn One Tech site and API information |
| `search_articles` | Search articles by keyword |
| `list_articles` | Browse recent articles |
| `get_article` | Read an article by ID or slug |
| `list_categories` | List public article categories |
| `search_site` | Search public posts and pages |

## Cursor installation

Cursor supports MCP servers through `mcp.json`, and community MCP servers can be listed through cursor.directory.

### One-click / plugin directory

Submit this repository at:

https://cursor.directory/plugins/new?type=mcp_server

The repository contains a `.cursor-plugin/plugin.json` manifest and root `mcp.json` so the directory can auto-detect the MCP component.

### Manual `mcp.json`

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

The server uses stdio and reads Learn One Tech's public WordPress API at `https://learnonetech.com/wp-json/wp/v2`.

## Example prompts in Cursor

- "Search Learn One Tech for Samsung FRP articles."
- "Find the latest Android troubleshooting articles on Learn One Tech."
- "Open the Learn One Tech article with slug `example-slug`."
- "List the categories available on Learn One Tech."

## Responsible use

Learn One Tech contains device-recovery and FRP-related material. Use device-recovery guidance only for devices you own or are authorized to service. The MCP server does not authenticate users or bypass device security itself; it only retrieves publicly available website content.

## License

MIT
