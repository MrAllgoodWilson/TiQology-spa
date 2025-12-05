import { useState } from 'react';
import type { AskKikiData } from '../../mocks/consumerDashboardMock';
import { askKiki } from '../../lib/aiClient';
import type { AIResponse } from '../../lib/aiClient';

interface AskKikiCardProps {
  data: AskKikiData;
}

export default function AskKikiCard({ data }: AskKikiCardProps) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAskKiki = async (task: string) => {
    if (!task.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      const aiResponse = await askKiki(task);
      setResponse(aiResponse);
      setQuestion(''); // Clear input on success
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response from Kiki';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskKiki(question);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAskKiki(suggestion);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {data.title} ✨
        </h2>
        <p className="text-sm text-base-content/70">{data.description}</p>
        
        <form onSubmit={handleSubmit} className="form-control mt-4">
          <input
            type="text"
            placeholder={data.placeholder}
            className="input input-bordered w-full"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="btn btn-primary mt-2"
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Thinking...
              </>
            ) : (
              'Ask Kiki'
            )}
          </button>
        </form>

        {/* AI Response Display */}
        {response && (
          <div className="alert alert-success mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h3 className="font-bold">Kiki's Response:</h3>
              <p className="text-sm whitespace-pre-wrap">{response.message}</p>
              {response.metadata && (
                <p className="text-xs opacity-60 mt-2">
                  {response.metadata.model} • {response.metadata.processingTimeMs}ms
                </p>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="alert alert-error mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold">Error</h3>
              <p className="text-sm">{error}</p>
              <p className="text-xs opacity-60 mt-1">
                Note: AI gateway not yet connected to backend
              </p>
            </div>
          </div>
        )}

        <div className="divider">Quick Suggestions</div>
        
        <div className="flex flex-wrap gap-2">
          {data.suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
