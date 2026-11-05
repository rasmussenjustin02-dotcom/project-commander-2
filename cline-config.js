/**
 * Project Commander 2 - Cline AI Agent Integration
 *
 * Bridges Project Commander 2 setup with Cline (VS Code AI agent).
 * OpenRouter is the only provider. The API key is read at runtime from
 * the OPENROUTER_API_KEY environment variable or from the same field on
 * the saved setup state. Keys are never written by this file.
 *
 * Usage in Cline:
 * 1. Load this file in your Cline initialization
 * 2. Access providers via window.projectCommanderProviders
 * 3. Model selection comes from setup state in localStorage when this script is loaded
 */

const STORAGE_KEY = 'pc2_setup_state_v5';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'openai/gpt-4o-mini';

function readSetupStateRaw() {
  try {
    if (typeof localStorage === 'undefined' || !localStorage) return null;
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Project Commander 2 setup state is not readable.', e);
    return null;
  }
}

function getProjectCommanderConfig() {
  const raw = readSetupStateRaw();
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse Project Commander 2 config:', e);
    return null;
  }
}

function readOpenRouterApiKey(setupState) {
  const fromEnv = (typeof process !== 'undefined' && process.env && process.env.OPENROUTER_API_KEY) || '';
  const fromSetup = (setupState && (setupState.OPENROUTER_API_KEY || (setupState.config && setupState.config.OPENROUTER_API_KEY))) || '';
  const key = String(fromEnv || fromSetup).trim();
  return key || null;
}

function readModel(setupState) {
  if (!setupState) return DEFAULT_MODEL;
  return setupState.defaultTextModel
    || (setupState.config && setupState.config.defaultTextModel)
    || DEFAULT_MODEL;
}

function readSetupComplete(setupState) {
  if (!setupState) return false;
  if (typeof setupState.setupComplete === 'boolean') return setupState.setupComplete;
  if (setupState.config && typeof setupState.config.setupComplete === 'boolean') return setupState.config.setupComplete;
  return false;
}

function buildClineProviderConfig() {
  const setupState = getProjectCommanderConfig();
  const apiKey = readOpenRouterApiKey(setupState);
  if (!setupState && !apiKey) return null;

  const model = readModel(setupState);

  return {
    openrouter: {
      name: 'OpenRouter',
      type: 'text-chat',
      model: model,
      endpoint: OPENROUTER_BASE_URL,
      apiKey: apiKey,
      isConfigured: Boolean(apiKey),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey ? `Bearer ${apiKey}` : null
      }
    },
    setupComplete: readSetupComplete(setupState),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Expose providers to Cline in window object
 * Cline can access this via: window.projectCommanderProviders
 */
if (typeof window !== 'undefined') {
  window.projectCommanderProviders = buildClineProviderConfig() || {
    setupComplete: false,
    openrouter: null
  };

  const openrouter = window.projectCommanderProviders.openrouter;
  console.log('Project Commander 2 - Cline integration ready');
  console.log('OpenRouter:', openrouter ? { model: openrouter.model, isConfigured: openrouter.isConfigured } : null);
}

/**
 * Export for Node.js environments (if used in backend)
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getProjectCommanderConfig,
    buildClineProviderConfig
  };
}

/**
 * Helper: Get OpenRouter config for text/chat
 */
function getOpenRouterConfig() {
  const providers = typeof window !== 'undefined' ? window.projectCommanderProviders : buildClineProviderConfig();
  if (!providers || !providers.openrouter || !providers.openrouter.isConfigured) {
    throw new Error('OpenRouter not configured. Set OPENROUTER_API_KEY and run Project Commander 2 setup first.');
  }
  return providers.openrouter;
}

/**
 * Cline Integration Examples
 *
 * Example 1: Use OpenRouter for chat in Cline
 * ```javascript
 * const openRouterConfig = getOpenRouterConfig();
 * const response = await fetch(openRouterConfig.endpoint + '/chat/completions', {
 *   method: 'POST',
 *   headers: openRouterConfig.headers,
 *   body: JSON.stringify({
 *     model: openRouterConfig.model,
 *     messages: userMessages
 *   })
 * });
 * ```
 *
 * Example 2: Check if setup is complete
 * ```javascript
 * if (window.projectCommanderProviders.setupComplete) {
 *   console.log('OpenRouter setup is complete');
 * } else {
 *   console.log('Run Project Commander 2 setup first');
 * }
 * ```
 */
