/**
 * Project Commander 2 - Cline AI Agent Integration
 * 
 * This module bridges Project Commander 2 setup with Cline (VS Code AI agent).
 * It exposes configured API keys and provider settings for Cline to use.
 * 
 * Usage in Cline:
 * 1. Load this file in your Cline initialization
 * 2. Access providers via window.projectCommanderProviders
 * 3. Use credentials from localStorage when this script is loaded
 */

// Load Project Commander 2 configuration from browser storage
const STORAGE_KEY = 'pc2_setup_state_v3';

function getProjectCommanderConfig() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    console.warn('Project Commander 2 not configured. Run launch.html setup first.');
    return null;
  }
  
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse Project Commander 2 config:', e);
    return null;
  }
}

function buildClineProviderConfig() {
  const config = getProjectCommanderConfig();
  if (!config) return null;

  return {
    // OrcRouter - Primary text/AI provider
    orcrouter: {
      name: 'OrcRouter',
      type: 'text-chat',
      model: config.config.orcrouterModel || 'qwen-3.8-27b-obsidian',
      endpoint: 'https://www.orcrouter.ai/api/v1/chat/completions',
      apiKey: config.config.orcrouterKey || null,
      isConfigured: config.config.orcrouterKeySet,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.config.orcrouterKey ? `Bearer ${config.config.orcrouterKey}` : null
      }
    },

    // Venice AI - Image + Video provider
    venice: {
      name: 'Venice AI',
      type: 'multi-modal',
      textModel: 'venice-uncensored',
      imageModel: config.config.veniceImageModel || 'venice-2-image-gen',
      videoModel: config.config.veniceVideoModel || 'venice-2-video-gen',
      endpoint: 'https://api.venice.ai/api/v1/chat/completions',
      imageEndpoint: 'https://api.venice.ai/api/v1/images/generations',
      videoEndpoint: 'https://api.venice.ai/api/v1/videos/generations',
      apiKey: config.config.veniceKey || null,
      isConfigured: config.config.veniceKeySet,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': config.config.veniceKey ? `Bearer ${config.config.veniceKey}` : null
      }
    },

    // Setup completion status
    setupComplete: config.setupComplete,
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
    orcrouter: null,
    venice: null
  };

  console.log('✅ Project Commander 2 - Cline Integration Ready');
  console.log('Providers:', window.projectCommanderProviders);
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
 * Helper: Get OrcRouter config for text/chat
 */
function getOrcRouterConfig() {
  const providers = window.projectCommanderProviders;
  if (!providers || !providers.orcrouter || !providers.orcrouter.isConfigured) {
    throw new Error('OrcRouter not configured. Run Project Commander 2 setup first.');
  }
  return providers.orcrouter;
}

/**
 * Helper: Get Venice config for image generation
 */
function getVeniceImageConfig() {
  const providers = window.projectCommanderProviders;
  if (!providers || !providers.venice || !providers.venice.isConfigured) {
    throw new Error('Venice AI not configured. Run Project Commander 2 setup first.');
  }
  return {
    endpoint: providers.venice.imageEndpoint,
    model: providers.venice.imageModel,
    apiKey: providers.venice.apiKey,
    headers: providers.venice.headers
  };
}

/**
 * Helper: Get Venice config for video generation
 */
function getVeniceVideoConfig() {
  const providers = window.projectCommanderProviders;
  if (!providers || !providers.venice || !providers.venice.isConfigured) {
    throw new Error('Venice AI not configured. Run Project Commander 2 setup first.');
  }
  return {
    endpoint: providers.venice.videoEndpoint,
    model: providers.venice.videoModel,
    apiKey: providers.venice.apiKey,
    headers: providers.venice.headers
  };
}

/**
 * Cline Integration Examples
 * 
 * Example 1: Use OrcRouter for chat in Cline
 * ```javascript
 * const orcConfig = getOrcRouterConfig();
 * const response = await fetch(orcConfig.endpoint, {
 *   method: 'POST',
 *   headers: orcConfig.headers,
 *   body: JSON.stringify({
 *     model: orcConfig.model,
 *     messages: userMessages
 *   })
 * });
 * ```
 * 
 * Example 2: Use Venice for image generation in Cline
 * ```javascript
 * const imageConfig = getVeniceImageConfig();
 * const response = await fetch(imageConfig.endpoint, {
 *   method: 'POST',
 *   headers: imageConfig.headers,
 *   body: JSON.stringify({
 *     model: imageConfig.model,
 *     prompt: 'A beautiful landscape'
 *   })
 * });
 * ```
 * 
 * Example 3: Check if everything is configured
 * ```javascript
 * if (window.projectCommanderProviders.setupComplete) {
 *   // All providers are ready
 *   console.log('Ready to use OrcRouter and Venice');
 * } else {
 *   console.log('Run Project Commander 2 setup first');
 * }
 * ```
 */
