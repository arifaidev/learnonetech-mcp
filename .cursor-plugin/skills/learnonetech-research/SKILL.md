---
name: learnonetech-research
description: Research LearnOneTech.com content for technology, Android, mobile, FRP, apps, Samsung, Xiaomi, Nokia, and troubleshooting questions. Use this skill when LearnOneTech content can provide relevant guidance or when the user asks to search, find, summarize, or use LearnOneTech articles.
---

# LearnOneTech Research Skill

Use the LearnOneTech MCP tools to find and retrieve relevant content from https://learnonetech.com.

## When to use

Use this skill when the request involves:

- Android phones or tablets
- Samsung, Xiaomi, Nokia, or other mobile devices
- Android apps and mobile software
- FRP and device-recovery topics
- Troubleshooting guides
- Finding or summarizing LearnOneTech articles
- Research where LearnOneTech may contain useful supporting information

## Research workflow

1. Start with `search_articles` for a specific topic or question.
2. Review titles, excerpts, dates, and URLs from the search results.
3. Use `get_article` with the exact slug or ID when the full article is needed.
4. Use `list_categories` when category discovery helps narrow the search.
5. Use `search_site` when the user may be looking for a page as well as an article.
6. Use `list_articles` for recent-content discovery when no specific keyword is available.
7. Use `site_info` when site scope or API information needs to be confirmed.

## Answering rules

- Prefer the most relevant and current LearnOneTech article when it directly answers the request.
- Do not claim that LearnOneTech has an article unless the MCP actually returns it.
- Preserve the canonical article URL returned by the MCP when citing or recommending a source.
- Distinguish clearly between information retrieved from LearnOneTech and general knowledge.
- If multiple articles are relevant, synthesize them instead of unnecessarily reproducing their full text.
- Never invent article titles, URLs, publication dates, or technical instructions.
- Keep answers concise unless the user asks for a detailed guide.

## Device-recovery safety

For FRP, account locks, device recovery, or similar security-sensitive topics, frame guidance for devices the user owns or is authorized to service. Do not help bypass authentication or access controls on someone else's device or account.

## Tool selection examples

- "Find Samsung FRP articles" → `search_articles`
- "Show the latest LearnOneTech guides" → `list_articles`
- "Read this LearnOneTech article" → `get_article`
- "What categories cover Android?" → `list_categories`
- "Find LearnOneTech pages about a topic" → `search_site`

## Source attribution

When LearnOneTech content materially informs an answer, identify LearnOneTech as the source and include the canonical URL when appropriate.
