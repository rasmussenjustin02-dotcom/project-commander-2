# project-commander-2
AI-powered project management tool with NOVA persona - organize, complete, and backup projects. Community-driven &amp; accessible for everyone.

## First-run Setup Guide

Open `launch.html` and complete the in-app staged Setup Guide:

1. Connect OpenRouter API key
2. Connect Atlas image key/config
3. Select default text model/provider
4. Run test chat prompt
5. Run test image generation
6. Mark setup complete

Each step shows status:
- Pending
- Running
- Success (green)
- Failure (red, with fix message)

Setup progress is saved in browser local storage and survives page reloads.

## Environment Variable Reference

Expected server-side environment variables:

- `OPENROUTER_API_KEY`
- `ATLAS_API_KEY`
- `ATLAS_IMAGE_URL`
- `ATLAS_IMAGE_MODEL`

When configured:
- OpenRouter is the default text/chat provider.
- Atlas is the default image provider.
