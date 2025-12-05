/**
 * AI Gateway Client
 * 
 * Centralized client for all AI interactions in TiQology.
 * This layer abstracts AI providers and prepares the system for future
 * AGI/superintelligence integrations.
 * 
 * All AI requests MUST go through this client - no direct calls to
 * OpenAI, Anthropic, or any other AI service.
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://helloworld-world-enterprise-rails-1.onrender.com';

const isDevelopment = import.meta.env.MODE === 'development';

function logAIDev(...args: any[]) {
  if (isDevelopment) {
    console.log('[AI Client]', ...args);
  }
}

function logAIErrorDev(...args: any[]) {
  if (isDevelopment) {
    console.error('[AI Client]', ...args);
  }
}

/**
 * Supported AI agent roles in the TiQology ecosystem
 */
export type AIRole = 
  | 'opsbot'        // Operational automation and task execution
  | 'leri'          // Financial analysis and ledger management
  | 'rocket'        // Deployment and infrastructure management
  | 'devin'         // Code generation and engineering tasks
  | 'kiki'          // General conversational AI assistant
  | 'sentinel'      // Security and threat detection (TrustShield)
  | 'oracle'        // Data analytics and predictions
  | 'sage';         // Strategic planning and decision support

/**
 * AI Request Payload
 */
export interface AIRequest {
  /** The AI agent role to invoke */
  role: AIRole;
  
  /** The task/prompt for the AI */
  task: string;
  
  /** Optional context object with additional data */
  context?: Record<string, any>;
  
  /** Optional conversation history for multi-turn interactions */
  history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  
  /** Optional model preferences (e.g., 'gpt-4', 'claude-3-opus') */
  model?: string;
  
  /** Optional temperature setting (0.0 - 1.0) */
  temperature?: number;
  
  /** Optional max tokens for response */
  maxTokens?: number;
}

/**
 * AI Response Payload
 */
export interface AIResponse {
  /** The AI-generated response text */
  message: string;
  
  /** The role that processed the request */
  role: AIRole;
  
  /** Metadata about the response */
  metadata: {
    /** Model used to generate the response */
    model: string;
    
    /** Tokens used in the request */
    tokensUsed?: number;
    
    /** Response timestamp */
    timestamp: string;
    
    /** Processing time in milliseconds */
    processingTimeMs?: number;
    
    /** Confidence score (0.0 - 1.0) if available */
    confidence?: number;
  };
  
  /** Optional structured data returned by the AI */
  data?: Record<string, any>;
  
  /** Optional follow-up suggestions */
  suggestions?: string[];
  
  /** Optional related actions */
  actions?: Array<{
    label: string;
    actionId: string;
    parameters?: Record<string, any>;
  }>;
}

/**
 * AI Error Response
 */
export interface AIError {
  error: string;
  code: string;
  details?: Record<string, any>;
}

/**
 * Get authentication token from localStorage
 */
function getToken(): string | null {
  return localStorage.getItem('token');
}

/**
 * Get headers for AI requests
 */
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Handle AI API response
 */
async function handleAIResponse<T>(response: Response): Promise<T> {
  logAIDev('AI Response received:', {
    url: response.url,
    status: response.status,
    statusText: response.statusText,
    ok: response.ok
  });
  
  if (!response.ok) {
    let errorBody = '';
    try {
      errorBody = await response.text();
    } catch (e) {
      logAIErrorDev('Failed to read AI error response:', e);
    }
    
    const errorMessage = `AI API Error ${response.status}: ${errorBody || response.statusText}`;
    logAIErrorDev('AI API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      body: errorBody,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    throw new Error(errorMessage);
  }
  
  return response.json() as Promise<T>;
}

/**
 * Send AI Request
 * 
 * Central function for all AI interactions in TiQology.
 * This function routes requests to the backend AI gateway,
 * which handles provider selection, load balancing, and
 * response normalization.
 * 
 * @example
 * ```typescript
 * const response = await sendAIRequest({
 *   role: 'kiki',
 *   task: 'Summarize my financial snapshot for this month',
 *   context: { userId: user.id, organizationId: org.id }
 * });
 * 
 * console.log(response.message);
 * ```
 */
export async function sendAIRequest(payload: AIRequest): Promise<AIResponse> {
  const url = `${BASE_URL}/api/ai/chat`;
  
  logAIDev('Sending AI request:', {
    url,
    role: payload.role,
    taskPreview: payload.task.substring(0, 100) + (payload.task.length > 100 ? '...' : ''),
    hasContext: !!payload.context,
    hasHistory: !!payload.history,
    model: payload.model || 'default',
    temperature: payload.temperature,
    maxTokens: payload.maxTokens
  });
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    const data = await handleAIResponse<AIResponse>(response);
    
    logAIDev('AI response received:', {
      role: data.role,
      messageLength: data.message.length,
      model: data.metadata.model,
      tokensUsed: data.metadata.tokensUsed,
      processingTimeMs: data.metadata.processingTimeMs,
      hasSuggestions: !!data.suggestions,
      hasActions: !!data.actions
    });
    
    return data;
  } catch (error) {
    logAIErrorDev('AI request failed:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to AI service. Please check your connection.');
    }
    
    throw error;
  }
}

/**
 * Stream AI Response (for long-running requests)
 * 
 * Future enhancement: Support streaming responses for real-time AI interactions.
 * This will enable progressive rendering of AI-generated content.
 * 
 * @example
 * ```typescript
 * const stream = streamAIRequest({
 *   role: 'sage',
 *   task: 'Generate a comprehensive strategic plan for Q1 2026'
 * });
 * 
 * for await (const chunk of stream) {
 *   console.log(chunk.message);
 * }
 * ```
 */
export async function* streamAIRequest(payload: AIRequest): AsyncGenerator<Partial<AIResponse>> {
  // TODO: Implement streaming when backend supports SSE or WebSockets
  logAIDev('Streaming AI request (not yet implemented):', payload.role);
  
  // For now, fall back to regular request and yield once
  const response = await sendAIRequest(payload);
  yield response;
}

/**
 * Predefined AI Agent Helpers
 * 
 * Convenience functions for specific AI roles
 */

/**
 * Ask Kiki (General AI Assistant)
 */
export async function askKiki(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'kiki',
    task,
    context
  });
}

/**
 * Ask Leri (Financial AI)
 */
export async function askLeri(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'leri',
    task,
    context
  });
}

/**
 * Ask Devin (Engineering AI)
 */
export async function askDevin(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'devin',
    task,
    context
  });
}

/**
 * Ask Rocket (Deployment AI)
 */
export async function askRocket(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'rocket',
    task,
    context
  });
}

/**
 * Ask Sentinel (Security AI)
 */
export async function askSentinel(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'sentinel',
    task,
    context
  });
}

/**
 * Ask Oracle (Analytics AI)
 */
export async function askOracle(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'oracle',
    task,
    context
  });
}

/**
 * Ask Sage (Strategic AI)
 */
export async function askSage(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'sage',
    task,
    context
  });
}

/**
 * Ask OpsBot (Operational AI)
 */
export async function askOpsBot(task: string, context?: Record<string, any>): Promise<AIResponse> {
  return sendAIRequest({
    role: 'opsbot',
    task,
    context
  });
}

/**
 * Future: Multi-Agent Orchestration
 * 
 * When multiple AI agents need to collaborate on a complex task,
 * this function will coordinate their interactions.
 */
export async function orchestrateAgents(
  task: string,
  roles: AIRole[],
  context?: Record<string, any>
): Promise<AIResponse[]> {
  logAIDev('Multi-agent orchestration requested:', { task, roles });
  
  // TODO: Implement agent orchestration logic
  // For now, execute sequentially
  const responses: AIResponse[] = [];
  
  for (const role of roles) {
    const response = await sendAIRequest({ role, task, context });
    responses.push(response);
  }
  
  return responses;
}
