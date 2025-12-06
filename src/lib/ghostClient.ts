/**
 * Ghost Mode API Client
 * 
 * Lightweight AI evaluation client for the Ghost Mode API.
 * Provides structured evaluations with scores and feedback.
 * 
 * Unlike the main AI client (aiClient.ts), Ghost Mode is:
 * - Stateless (no conversation history)
 * - Fast (optimized for quick evaluations)
 * - Standalone (works independently of backend)
 * - Score-based (returns 0-100 scores + feedback)
 */

const GHOST_API_URL = import.meta.env.VITE_GHOST_API_URL ?? 'http://localhost:3000/api/ghost';
const GHOST_API_KEY = import.meta.env.VITE_GHOST_API_KEY;

const isDevelopment = import.meta.env.MODE === 'development';

function logGhostDev(...args: any[]) {
  if (isDevelopment) {
    console.log('[Ghost Client]', ...args);
  }
}

function logGhostErrorDev(...args: any[]) {
  if (isDevelopment) {
    console.error('[Ghost Client]', ...args);
  }
}

/**
 * Ghost Mode Request Payload
 */
export interface GhostRequest {
  /** The evaluation prompt/question */
  prompt: string;
  
  /** Optional context for evaluation */
  context?: {
    source?: string;
    module?: string;
    userId?: string;
    [key: string]: any;
  };
  
  /** Model selection: 'chat-model' (fast) or 'chat-model-reasoning' (deep) */
  model?: 'chat-model' | 'chat-model-reasoning';
}

/**
 * Ghost Mode Response Payload
 */
export interface GhostResponse {
  /** Quality/confidence score (0-100) */
  score: number;
  
  /** Brief evaluation feedback */
  feedback: string;
  
  /** Full AI response text */
  result: string;
  
  /** Response timestamp */
  timestamp: string;
  
  /** Model used for evaluation */
  model: string;
}

/**
 * Ghost Mode Error
 */
export interface GhostError {
  error: string;
  message?: string;
  code?: string;
}

/**
 * Send Ghost Mode Evaluation Request
 * 
 * @example
 * ```typescript
 * const result = await evaluateWithGhost({
 *   prompt: 'Is this email valid: user@example.com?',
 *   context: { source: 'TiQology', module: 'GhostLab' }
 * });
 * 
 * console.log(`Score: ${result.score}/100`);
 * console.log(`Feedback: ${result.feedback}`);
 * ```
 */
export async function evaluateWithGhost(request: GhostRequest): Promise<GhostResponse> {
  logGhostDev('Ghost evaluation request:', {
    promptPreview: request.prompt.substring(0, 100) + (request.prompt.length > 100 ? '...' : ''),
    hasContext: !!request.context,
    model: request.model || 'chat-model'
  });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (GHOST_API_KEY) {
    headers['x-api-key'] = GHOST_API_KEY;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(GHOST_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        prompt: request.prompt,
        context: request.context,
        model: request.model || 'chat-model'
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData: GhostError = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`
      }));
      
      logGhostErrorDev('Ghost API error:', errorData);
      throw new Error(errorData.message || errorData.error);
    }

    const data: GhostResponse = await response.json();
    
    logGhostDev('Ghost evaluation response:', {
      score: data.score,
      feedbackLength: data.feedback.length,
      model: data.model,
      timestamp: data.timestamp
    });

    return data;
  } catch (error) {
    logGhostErrorDev('Ghost evaluation failed:', error);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Evaluation timeout: Request took longer than 30 seconds');
      }
      if (error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Ghost Mode API');
      }
    }

    throw error;
  }
}

/**
 * Check Ghost Mode API Health
 */
export async function checkGhostHealth(): Promise<{ status: string; service: string; version: string }> {
  try {
    const response = await fetch(GHOST_API_URL, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    logGhostErrorDev('Ghost health check failed:', error);
    throw error;
  }
}

/**
 * Batch Ghost Evaluations (Future Enhancement)
 * 
 * Evaluate multiple prompts in a single request for efficiency.
 */
export async function batchEvaluate(requests: GhostRequest[]): Promise<GhostResponse[]> {
  logGhostDev('Batch evaluation (sequential):', requests.length);
  
  // For now, evaluate sequentially
  // TODO: Implement true batch API when backend supports it
  const results: GhostResponse[] = [];
  
  for (const request of requests) {
    const result = await evaluateWithGhost(request);
    results.push(result);
  }
  
  return results;
}
