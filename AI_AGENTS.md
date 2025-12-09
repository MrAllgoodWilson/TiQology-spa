# TiQology AI Agents Ecosystem

TiQology SuperApp features a comprehensive AI ecosystem powered by multiple specialized AI agents. Each agent is designed with specific capabilities to handle different aspects of the platform, from financial analysis to security monitoring.

## Overview

All AI interactions in TiQology go through a centralized **AI Gateway Client** (`src/lib/aiClient.ts`). This architecture ensures:

- **Abstraction**: No direct calls to AI providers (OpenAI, Anthropic, etc.)
- **Consistency**: Normalized responses across all AI interactions
- **Scalability**: Easy integration of new AI providers and models
- **Future-Ready**: Prepared for AGI/superintelligence integrations

## The AI Agents

TiQology currently features **8 specialized AI agents**, each with a unique role:

### 1. 🤖 Kiki - General AI Assistant

**Role**: `kiki`  
**Purpose**: General conversational AI and user assistance

Kiki serves as the primary AI assistant for users, providing:
- Financial guidance and advice
- General questions and information
- Task recommendations
- Personalized suggestions based on user context

**Example Usage**:
```typescript
import { askKiki } from '@/lib/aiClient';

const response = await askKiki(
  'Summarize my financial snapshot for this month',
  { userId: user.id, organizationId: org.id }
);
console.log(response.message);
```

**Featured In**: Dashboard (Ask Kiki Card)

---

### 2. 👨‍💻 Devin - Engineering AI

**Role**: `devin`  
**Purpose**: Code generation and engineering tasks

Devin is TiQology's engineering AI, specialized in:
- Code generation and refactoring
- Technical problem-solving
- Architecture recommendations
- Development automation
- Bug analysis and fixes

**Example Usage**:
```typescript
import { askDevin } from '@/lib/aiClient';

const response = await askDevin(
  'Generate a React component for displaying transaction history',
  { 
    framework: 'React',
    styling: 'TailwindCSS + DaisyUI',
    typescript: true 
  }
);
```

**Note**: Named after the AI software engineer concept, representing autonomous coding capabilities.

---

### 3. 💰 Leri - Financial AI

**Role**: `leri`  
**Purpose**: Financial analysis and ledger management

Leri specializes in financial intelligence:
- Transaction analysis
- Budget recommendations
- Spending pattern insights
- Financial health assessments
- Investment suggestions

**Example Usage**:
```typescript
import { askLeri } from '@/lib/aiClient';

const response = await askLeri(
  'Analyze my spending patterns and suggest budget optimizations',
  { userId: user.id, timeframe: 'last_30_days' }
);
```

---

### 4. 🚀 Rocket - Deployment AI

**Role**: `rocket`  
**Purpose**: Deployment and infrastructure management

Rocket handles deployment operations:
- Infrastructure automation
- Deployment orchestration
- Performance monitoring
- Scaling recommendations
- DevOps workflows

**Example Usage**:
```typescript
import { askRocket } from '@/lib/aiClient';

const response = await askRocket(
  'Check deployment status and suggest optimizations',
  { environment: 'production' }
);
```

---

### 5. 🛡️ Sentinel - Security AI

**Role**: `sentinel`  
**Purpose**: Security and threat detection

Sentinel powers TrustShield Lite security features:
- Threat detection and analysis
- Security vulnerability scanning
- Risk assessments
- Security recommendations
- Incident response guidance

**Example Usage**:
```typescript
import { askSentinel } from '@/lib/aiClient';

const response = await askSentinel(
  'Analyze recent security events and assess threat level',
  { userId: user.id, timeframe: 'last_7_days' }
);
```

**Featured In**: TrustShield Lite module

---

### 6. 🔮 Oracle - Analytics AI

**Role**: `oracle`  
**Purpose**: Data analytics and predictions

Oracle provides predictive analytics:
- Data pattern recognition
- Trend forecasting
- Predictive modeling
- Business intelligence
- Decision support data

**Example Usage**:
```typescript
import { askOracle } from '@/lib/aiClient';

const response = await askOracle(
  'Predict next quarter revenue based on current trends',
  { organizationId: org.id, historicalData: data }
);
```

---

### 7. 🧙 Sage - Strategic AI

**Role**: `sage`  
**Purpose**: Strategic planning and decision support

Sage offers high-level strategic guidance:
- Business strategy recommendations
- Long-term planning
- Decision analysis
- Goal setting and tracking
- Resource optimization

**Example Usage**:
```typescript
import { askSage } from '@/lib/aiClient';

const response = await askSage(
  'Generate a comprehensive strategic plan for the next quarter',
  { organizationId: org.id, goals: userGoals }
);
```

---

### 8. ⚙️ OpsBot - Operational AI

**Role**: `opsbot`  
**Purpose**: Operational automation and task execution

OpsBot handles day-to-day operations:
- Task automation
- Workflow orchestration
- Operational efficiency
- Process optimization
- Routine task execution

**Example Usage**:
```typescript
import { askOpsBot } from '@/lib/aiClient';

const response = await askOpsBot(
  'Automate recurring payment processing workflow',
  { organizationId: org.id, frequency: 'monthly' }
);
```

---

## Using the AI Gateway

### Basic Request

All AI interactions use the centralized `sendAIRequest` function:

```typescript
import { sendAIRequest } from '@/lib/aiClient';

const response = await sendAIRequest({
  role: 'kiki',
  task: 'Help me understand my financial summary',
  context: { userId: '123', period: 'monthly' }
});

console.log(response.message);
```

### Request Payload Structure

```typescript
interface AIRequest {
  role: AIRole;                    // Which agent to use
  task: string;                     // Your prompt/question
  context?: Record<string, any>;    // Additional data
  history?: Array<{                 // Conversation history
    role: 'user' | 'assistant';
    content: string;
  }>;
  model?: string;                   // Optional model preference
  temperature?: number;             // 0.0 - 1.0 (focused to creative)
  maxTokens?: number;               // Response length limit
}
```

### Response Structure

```typescript
interface AIResponse {
  message: string;                  // AI-generated response
  role: AIRole;                     // Which agent responded
  metadata: {
    model: string;                  // Model used
    tokensUsed?: number;           // Token consumption
    timestamp: string;              // When processed
    processingTimeMs?: number;     // Processing time
    confidence?: number;            // Confidence score (0-1)
  };
  data?: Record<string, any>;      // Structured data
  suggestions?: string[];           // Follow-up suggestions
  actions?: Array<{                 // Actionable items
    label: string;
    actionId: string;
    parameters?: Record<string, any>;
  }>;
}
```

## Multi-Agent Orchestration

For complex tasks requiring multiple AI agents, you can use the `orchestrateAgents()` function:

```typescript
import { orchestrateAgents } from '@/lib/aiClient';

const responses = await orchestrateAgents(
  'Analyze financial health and create strategic plan',
  ['leri', 'oracle', 'sage'],
  { userId: user.id, organizationId: org.id }
);

// Returns an array of responses, one from each agent
responses.forEach(response => {
  console.log(`${response.role}: ${response.message}`);
});
```

**Note**: The current implementation executes agents sequentially. Future versions will support parallel execution and intelligent task decomposition for more efficient multi-agent collaboration.

## Streaming Responses (Partial Implementation)

The AI Gateway includes a `streamAIRequest()` function for progressive rendering:

```typescript
import { streamAIRequest } from '@/lib/aiClient';

const stream = streamAIRequest({
  role: 'sage',
  task: 'Generate comprehensive strategic plan for next quarter'
});

for await (const chunk of stream) {
  console.log(chunk.message);
  // Render progressively
}
```

**Current Status**: The function exists and can be called, but currently falls back to a single response (non-streaming). Full streaming support will be enabled when the backend implements Server-Sent Events (SSE) or WebSocket connections.

## Advanced Features

The AI Gateway Client supports several advanced capabilities:

### Currently Implemented

- **Multi-turn Conversations**: Pass conversation history in the `history` field to maintain context across requests
- **Custom Models**: Specify preferred models per-request using the `model` parameter (e.g., 'gpt-4', 'claude-3-opus')
- **Temperature Control**: Adjust response creativity vs. consistency using the `temperature` parameter (0.0 - 1.0)
- **Token Management**: Control response length with the `maxTokens` parameter
- **Multi-Agent Orchestration**: Use `orchestrateAgents()` to coordinate multiple AI agents on complex tasks (currently executes sequentially)

### Planned Enhancements

- **Streaming Responses**: Real-time progressive rendering for long-running tasks
  - The `streamAIRequest()` function exists but currently falls back to a single response
  - Full streaming support requires backend SSE or WebSocket implementation
- **Advanced Agent Collaboration**: Intelligent task decomposition and parallel agent execution
- **Response Caching**: Cache frequently asked questions to reduce costs and improve response time
- **Context Persistence**: Automatic conversation context management across sessions

## Backend Integration

All AI requests are routed through the backend AI gateway:

**Endpoint**: `POST /api/ai/chat`

The backend handles:
- AI provider selection and load balancing
- Request/response normalization
- Authentication and rate limiting
- Usage tracking and analytics
- Error handling and fallbacks

## Best Practices

1. **Choose the Right Agent**: Match the agent to your task type
2. **Provide Context**: Include relevant data in the context object
3. **Handle Errors**: Always implement error handling for AI requests
4. **Monitor Usage**: Track token consumption for cost management
5. **Use History**: For multi-turn conversations, pass conversation history
6. **Test Thoroughly**: AI responses can vary; test edge cases

## Security Considerations

- All AI requests require authentication (JWT Bearer tokens)
- Context data is not logged in production
- User data privacy is maintained
- No direct AI provider API keys in frontend code
- Rate limiting prevents abuse

## Who is Devin?

**Devin** is TiQology's specialized engineering AI agent, designed to handle code generation, technical problem-solving, and development automation tasks within the TiQology ecosystem.

### The Name's Inspiration

The name "Devin" is inspired by the broader concept of AI software engineers. In the tech industry, "Devin" is recognized as an AI software engineer developed by Cognition AI, known for its ability to autonomously write code, fix bugs, and complete software engineering tasks end-to-end.

TiQology's Devin agent is a **separate implementation** that brings similar engineering AI capabilities specifically to the TiQology platform. While inspired by the same vision of AI-powered software engineering, TiQology's Devin is integrated with the platform's AI Gateway and designed to work alongside the other specialized agents in the TiQology ecosystem.

### Capabilities

Within TiQology, Devin serves as your engineering assistant, providing:
- Intelligent code generation and refactoring
- Technical architecture recommendations  
- Development workflow automation
- Bug analysis and resolution strategies
- Best practice guidance for the TiQology stack

---

## Summary

TiQology's AI ecosystem provides specialized intelligence across all aspects of the platform. Whether you need financial advice from **Leri**, security analysis from **Sentinel**, or code generation from **Devin**, the AI Gateway Client makes it simple to leverage these powerful capabilities while maintaining a consistent, secure, and scalable architecture.

For implementation details, see `src/lib/aiClient.ts`.
