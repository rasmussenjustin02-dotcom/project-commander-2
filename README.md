# project-commander-2
AI-powered project management tool with NOVA persona - organize, complete, and backup projects. Community-driven &amp; accessible for everyone.

## First-run Setup Guide

Open `launch.html` and follow the steps to enter an OpenRouter API key, choose a model, test chat, and finish setup. The key is held only in the current page's memory; it is not saved in browser storage and must be entered again after a reload. The selected model ID and guide visibility are saved in browser storage.

The setup page sends chat requests directly from the browser to OpenRouter. Use it only for private local testing, not on a public or shared site. A deployed app should send requests through a backend that reads `OPENROUTER_API_KEY` from its server-side environment; do not put real keys in source files or commit them.

The current setup guide supports OpenRouter chat only. Atlas image generation and Hugging Face are not configured by this page.
