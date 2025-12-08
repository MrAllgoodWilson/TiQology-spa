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
  'Generate a comprehensive strategic plan for Q1 2026',
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
  temperature?: number;             // 0.0 - 1.0 (creativity)
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

For complex tasks requiring multiple AI agents:

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

## Future Enhancements

### Streaming Responses (Planned)

For long-running AI tasks, streaming support is planned:

```typescript
import { streamAIRequest } from '@/lib/aiClient';

const stream = streamAIRequest({
  role: 'sage',
  task: 'Generate comprehensive Q1 2026 strategic plan'
});

for await (const chunk of stream) {
  console.log(chunk.message);
  // Render progressively
}
```

### Advanced Features

- **Multi-turn Conversations**: Maintain conversation context across requests
- **Agent Collaboration**: Agents working together on complex tasks
- **Custom Models**: Per-request model selection (GPT-4, Claude, etc.)
- **Temperature Control**: Adjust creativity vs. consistency
- **Token Management**: Optimize token usage and costs
- **Caching**: Response caching for frequently asked questions

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

**Devin** is TiQology's specialized engineering AI agent, designed to handle code generation, technical problem-solving, and development automation tasks. The name is inspired by the concept of AI software engineers, representing the future of autonomous coding capabilities.

In the broader tech industry, "Devin" also refers to an AI software engineer created by Cognition AI, which can autonomously write code, fix bugs, and complete software engineering tasks. TiQology's Devin agent embodies similar capabilities within the TiQology ecosystem, serving as a specialized assistant for engineering tasks.

---

## Summary

TiQology's AI ecosystem provides specialized intelligence across all aspects of the platform. Whether you need financial advice from **Leri**, security analysis from **Sentinel**, or code generation from **Devin**, the AI Gateway Client makes it simple to leverage these powerful capabilities while maintaining a consistent, secure, and scalable architecture.

For implementation details, see `src/lib/aiClient.ts`.
