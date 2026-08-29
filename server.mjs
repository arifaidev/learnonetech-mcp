#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const SITE_URL = "https://learnonetech.com";
const API_URL = `${SITE_URL}/wp-json/wp/v2`;
const USER_AGENT = "learnonetech-mcp/1.0.1 (+https://learnonetech.com)";

async function wp(path, params = {}) {
  const url = new URL(`${API_URL}/${path.replace(/^\//, "")}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`LearnOneTech API returned ${response.status}: ${body.slice(0, 300)}`);
  }
  return response.json();
}

function stripHtml(html = "") {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8216;/gi, "'")
    .replace(/&#8220;/gi, '"')
    .replace(/&#8221;/gi, '"')
    .replace(/&#8211;/gi, "-")
    .replace(/&#8212;/gi, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function summarizePost(post) {
  return {
    id: post.id,
    title: stripHtml(post.title?.rendered || ""),
    slug: post.slug,
    url: post.link,
    date: post.date,
    modified: post.modified,
    excerpt: stripHtml(post.excerpt?.rendered || "").slice(0, 500),
    categories: post.categories || [],
  };
}

const server = new McpServer({ name: "learnonetech", version: "1.0.1" });

server.tool("site_info", "Get basic information about LearnOneTech and its public WordPress API.", {}, async () => ({
  content: [{ type: "text", text: JSON.stringify({
    name: "LearnOneTech",
    url: SITE_URL,
    description: "Technology, Android, mobile, FRP, apps and troubleshooting guides.",
    api: `${API_URL}/`,
    note: "Content is fetched from the public LearnOneTech website. Use device-recovery guidance only for devices you own or are authorized to service."
  }, null, 2) }]
}));

server.tool("search_articles", "Search LearnOneTech articles by keyword. Returns titles, excerpts, dates and URLs.", {
  query: z.string().min(1).max(200).describe("Keyword or phrase to search for"),
  limit: z.number().int().min(1).max(20).default(10).describe("Maximum number of results")
}, async ({ query, limit }) => {
  const posts = await wp("posts", { search: query, per_page: limit, _fields: "id,date,modified,slug,link,title,excerpt,categories" });
  return { content: [{ type: "text", text: JSON.stringify({ query, results: posts.map(summarizePost) }, null, 2) }] };
});

server.tool("list_articles", "List recent LearnOneTech articles with pagination.", {
  page: z.number().int().min(1).default(1),
  per_page: z.number().int().min(1).max(20).default(10),
  category_id: z.number().int().positive().optional().describe("Optional WordPress category ID")
}, async ({ page, per_page, category_id }) => {
  const posts = await wp("posts", { page, per_page, categories: category_id, _fields: "id,date,modified,slug,link,title,excerpt,categories" });
  return { content: [{ type: "text", text: JSON.stringify({ page, per_page, results: posts.map(summarizePost) }, null, 2) }] };
});

server.tool("get_article", "Retrieve a LearnOneTech article by numeric WordPress post ID or exact slug. Returns cleaned readable text plus the canonical URL.", {
  id: z.number().int().positive().optional(),
  slug: z.string().min(1).max(200).optional()
}, async ({ id, slug }) => {
  if (!id && !slug) throw new Error("Provide either id or slug.");
  const posts = await wp("posts", id ? { include: id, per_page: 1 } : { slug, per_page: 1 });
  if (!posts.length) throw new Error("Article not found.");
  const post = posts[0];
  return { content: [{ type: "text", text: JSON.stringify({
    id: post.id,
    title: stripHtml(post.title?.rendered || ""),
    slug: post.slug,
    url: post.link,
    date: post.date,
    modified: post.modified,
    content: stripHtml(post.content?.rendered || "")
  }, null, 2) }] };
});

server.tool("list_categories", "List LearnOneTech WordPress article categories.", {
  limit: z.number().int().min(1).max(100).default(50)
}, async ({ limit }) => {
  const categories = await wp("categories", { per_page: limit, hide_empty: true, _fields: "id,name,slug,count,link" });
  return { content: [{ type: "text", text: JSON.stringify(categories, null, 2) }] };
});

server.tool("search_site", "Search LearnOneTech posts and pages using WordPress's public search endpoint.", {
  query: z.string().min(1).max(200),
  limit: z.number().int().min(1).max(20).default(10)
}, async ({ query, limit }) => {
  const results = await wp("search", { search: query, per_page: limit, subtype: "post,page", _fields: "id,title,url,type,subtype" });
  return { content: [{ type: "text", text: JSON.stringify(results.map(r => ({ ...r, title: stripHtml(r.title) })), null, 2) }] };
});

await server.connect(new StdioServerTransport());
