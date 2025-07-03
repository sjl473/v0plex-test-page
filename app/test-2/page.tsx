"use client"

import CodeBlock from "@/components/code-block"
import ContentTable from "@/components/content-table"
import InfoCard from "@/components/info-card"
import CardGrid from "@/components/card-grid"
import HighlightBox from "@/components/highlight-box"
import { Code, Dashboard } from "@carbon/icons-react"

export default function Test2Page() {
  const tableData = [
    {
      Concept: <strong>Arrow Functions</strong>,
      Description: "Concise function syntax with lexical this binding",
      "Use Case": "Event handlers, array methods, callbacks",
      "Best Practice": "Use for short functions, avoid for methods",
    },
    {
      Concept: <strong>Async/Await</strong>,
      Description: "Syntactic sugar for handling promises",
      "Use Case": "API calls, file operations, database queries",
      "Best Practice": "Always use try-catch for error handling",
    },
    {
      Concept: <strong>Destructuring</strong>,
      Description: "Extract values from arrays or objects",
      "Use Case": "Function parameters, API responses",
      "Best Practice": "Use default values for optional properties",
    },
  ]

  const multiColumnTableData = [
    {
      Framework: "React",
      Type: "Library",
      Language: "JavaScript/TypeScript",
      Performance: "High with optimization",
      "Learning Curve": "Moderate to steep",
      Community: "Very large and active community with extensive ecosystem",
    },
    {
      Framework: "Vue.js",
      Type: "Progressive Framework",
      Language: "JavaScript/TypeScript",
      Performance: "High performance out of the box",
      "Learning Curve": "Gentle learning curve for beginners",
      Community: "Growing community with good documentation and tooling",
    },
    {
      Framework: "Angular",
      Type: "Full Framework",
      Language: "TypeScript primarily",
      Performance: "Good with proper optimization techniques",
      "Learning Curve": "Steep learning curve due to complexity",
      Community: "Large enterprise-focused community with comprehensive tooling",
    },
    {
      Framework: "Svelte",
      Type: "Compiler",
      Language: "JavaScript/TypeScript",
      Performance: "Excellent performance with small bundle sizes",
      "Learning Curve": "Easy to learn with simple syntax",
      Community: "Smaller but enthusiastic community with growing adoption",
    },
    {
      Framework: "Next.js",
      Type: "Meta Framework",
      Language: "JavaScript/TypeScript",
      Performance: "Excellent with built-in optimizations",
      "Learning Curve": "Moderate if familiar with React",
      Community: "Large community backed by Vercel with excellent documentation",
    },
  ]

  return (
    <div className="v0plex-content">
      <div className="page-typography-content">
        <h1>Test 2</h1>

        <p className="lead-text">
          A comprehensive exploration of modern JavaScript development patterns, best practices, and advanced techniques
          for building robust web applications.
        </p>

        <h2>JavaScript Fundamentals</h2>

        <ContentTable headers={["Concept", "Description", "Use Case", "Best Practice"]} rows={tableData} />

        <h2>Frontend Framework Comparison</h2>

        <p>
          Here's a comprehensive comparison of popular frontend frameworks with multiple columns to test table
          responsiveness:
        </p>

        <ContentTable
          headers={["Framework", "Type", "Language", "Performance", "Learning Curve", "Community"]}
          rows={multiColumnTableData}
        />

        <h3>Code Examples</h3>

        <p>Here are practical examples demonstrating modern JavaScript patterns:</p>

        <CodeBlock language="JavaScript">
          {`
const processUser = ({ name, email, age = 18 }) => {
  console.log(\`Processing user: \${name} (\${email}), Age: \${age}\`);
  return { name, email, age, processed: true };
};


async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return processUser(userData);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
}


const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

const activeAdults = users
  .filter(user => user.active && user.age >= 18)
  .map(user => ({ ...user, category: 'adult' }))
  .sort((a, b) => a.age - b.age);

console.log('Active adults:', activeAdults);`}
        </CodeBlock>

        <h3>Advanced Patterns</h3>

        <CardGrid columns={2}>
          <InfoCard title="Design Patterns" icon={<Code size={16} />} clickable>
            <ul>
              <li>Module pattern</li>
              <li>Observer pattern</li>
              <li>Factory pattern</li>
              <li>Singleton pattern</li>
            </ul>
          </InfoCard>

          <InfoCard title="Performance Optimization" icon={<Dashboard size={16} />} clickable>
            <ul>
              <li>Debouncing and throttling</li>
              <li>Lazy loading</li>
              <li>Memoization</li>
              <li>Virtual DOM concepts</li>
            </ul>
          </InfoCard>
        </CardGrid>

        <h3>Error Handling Strategy</h3>

        <CodeBlock language="JavaScript">
          {`
class APIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
  }
}

async function robustAPICall(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    const response = await fetch(endpoint, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new APIError(
        \`Request failed: \${response.statusText}\`,
        response.status,
        'HTTP_ERROR'
      );
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408, 'TIMEOUT');
    }
    
    throw error;
  }
}`}
        </CodeBlock>

        <HighlightBox title="Development Best Practices">
          <p>
            Modern JavaScript development requires understanding of asynchronous patterns, error handling, and
            performance optimization. Always prioritize code readability, maintainability, and robust error handling in
            production applications.
          </p>
        </HighlightBox>
      </div>
    </div>
  )
}
