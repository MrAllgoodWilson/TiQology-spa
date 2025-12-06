import { useState } from 'react';
import { evaluateWithGhost, checkGhostHealth, type GhostResponse } from '../lib/ghostClient';
import { useAuthStore } from '../stores/authStore';

export default function GhostLabPage() {
  const { user } = useAuthStore();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GhostResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [model, setModel] = useState<'chat-model' | 'chat-model-reasoning'>('chat-model');

  const handleEvaluate = async () => {
    if (!prompt.trim()) {
      setError('Please enter text to evaluate');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await evaluateWithGhost({
        prompt: prompt.trim(),
        context: {
          source: 'TiQology',
          module: 'GhostLab',
          userId: user?.id
        },
        model
      });

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Evaluation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    try {
      const health = await checkGhostHealth();
      setIsHealthy(health.status === 'healthy');
      setTimeout(() => setIsHealthy(null), 3000);
    } catch {
      setIsHealthy(false);
      setTimeout(() => setIsHealthy(null), 3000);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            👻 Ghost Lab
          </h1>
          <p className="text-base-content/70 mt-2">
            AI-powered evaluation engine powered by Ghost Mode API
          </p>
        </div>
        <button
          onClick={handleHealthCheck}
          className={`btn btn-sm ${
            isHealthy === true ? 'btn-success' : 
            isHealthy === false ? 'btn-error' : 
            'btn-ghost'
          }`}
          disabled={isHealthy !== null}
        >
          {isHealthy === true ? '✓ Healthy' : 
           isHealthy === false ? '✗ Offline' : 
           'Check Status'}
        </button>
      </div>

      {/* Main Input Card */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Evaluation Input</h2>
          
          {/* Model Selector */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">AI Model</span>
            </label>
            <div className="flex gap-4">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="model"
                  className="radio radio-primary"
                  checked={model === 'chat-model'}
                  onChange={() => setModel('chat-model')}
                />
                <span className="label-text">⚡ Fast (Standard)</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="model"
                  className="radio radio-secondary"
                  checked={model === 'chat-model-reasoning'}
                  onChange={() => setModel('chat-model-reasoning')}
                />
                <span className="label-text">🧠 Deep (Reasoning)</span>
              </label>
            </div>
          </div>

          {/* Text Input */}
          <textarea
            className="textarea textarea-bordered h-40 text-lg"
            placeholder="Enter any text for AI evaluation...

Examples:
• Is this email valid: user@example.com?
• Review this code: function add(a,b) { return a+b; }
• Summarize: The quick brown fox jumps over the lazy dog
• Analyze sentiment: I absolutely love this product!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />

          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleEvaluate}
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Evaluating...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Evaluate with Ghost
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Score Card */}
          <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-2xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-2xl">Evaluation Score</h2>
                <div className="badge badge-outline">{result.model}</div>
              </div>
              
              <div className="flex items-center gap-6 mt-4">
                {/* Score Circle */}
                <div className="relative">
                  <div className="radial-progress text-6xl font-bold" style={{ "--value": result.score, "--size": "12rem", "--thickness": "1rem" } as any}>
                    <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}
                    </span>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Quality Score</span>
                    <span className="text-base-content/70">{result.score}/100</span>
                  </div>
                  <progress 
                    className={`progress ${getScoreBgColor(result.score)} w-full h-6`}
                    value={result.score} 
                    max="100"
                  ></progress>
                  <div className="flex justify-between text-xs mt-1 text-base-content/50">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                AI Feedback
              </h2>
              <p className="text-lg leading-relaxed">{result.feedback}</p>
            </div>
          </div>

          {/* Full Response (Collapsible) */}
          <div className="collapse collapse-arrow bg-base-200 shadow-xl">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Full AI Response
              </div>
            </div>
            <div className="collapse-content"> 
              <div className="bg-base-300 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-mono text-sm">{result.result}</pre>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="stats shadow w-full">
            <div className="stat">
              <div className="stat-title">Model</div>
              <div className="stat-value text-2xl">{result.model === 'chat-model' ? '⚡ Fast' : '🧠 Deep'}</div>
              <div className="stat-desc">{result.model}</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Timestamp</div>
              <div className="stat-value text-2xl">
                {new Date(result.timestamp).toLocaleTimeString()}
              </div>
              <div className="stat-desc">{new Date(result.timestamp).toLocaleDateString()}</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Score Category</div>
              <div className={`stat-value text-2xl ${getScoreColor(result.score)}`}>
                {result.score >= 80 ? 'Excellent' : result.score >= 60 ? 'Good' : 'Needs Work'}
              </div>
              <div className="stat-desc">{result.score >= 80 ? '🎯' : result.score >= 60 ? '✓' : '⚠️'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions (when no results) */}
      {!result && !isLoading && (
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">How to Use Ghost Lab</h2>
            <div className="space-y-4 text-base-content/80">
              <p><strong>1. Enter your text</strong> - Paste any content you want to evaluate</p>
              <p><strong>2. Choose a model</strong> - Fast for quick checks, Deep for thorough analysis</p>
              <p><strong>3. Click Evaluate</strong> - Ghost will analyze and return a score (0-100) + feedback</p>
              <p className="text-sm mt-4 p-4 bg-base-300 rounded-lg">
                💡 <strong>Pro Tip:</strong> Ghost Lab is perfect for quick validations, content checks, 
                and getting AI feedback without saving conversation history.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
