"use client"

import CodeBlock from "@/components/code-block"
import InfoCard from "@/components/info-card"
import FakeCdsCardGrid from "@/components/fake-cds-card-grid"
import HighlightBox from "@/components/highlight-box"
import { Code, Dashboard } from "@carbon/icons-react"
import { Breadcrumb, BreadcrumbItem, GlobalTheme, Theme } from "@carbon/react"
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react'

import {useTheme} from "@/components/theme-provider";

export default function Test2Page() {
  const { theme } = useTheme();
  
  const jsConceptsRows = [
    {
      id: '1',
      concept: <strong>Arrow Functions</strong>,
      description: "Concise function syntax with lexical this binding",
      useCase: "Event handlers, array methods, callbacks",
      bestPractice: "Use for short functions, avoid for methods",
    },
    {
      id: '2',
      concept: <strong>Async/Await</strong>,
      description: "Syntactic sugar for handling promises",
      useCase: "API calls, file operations, database queries",
      bestPractice: "Always use try-catch for error handling",
    },
    {
      id: '3',
      concept: <strong>Destructuring</strong>,
      description: "Extract values from arrays or objects",
      useCase: "Function parameters, API responses",
      bestPractice: "Use default values for optional properties",
    },
  ]
  
  const jsConceptsHeaders = [
    {
      key: 'concept',
      header: 'Concept',
    },
    {
      key: 'description',
      header: 'Description',
    },
    {
      key: 'useCase',
      header: 'Use Case',
    },
    {
      key: 'bestPractice',
      header: 'Best Practice',
    },
  ];
  
  const frameworkRows = [
    {
      id: '1',
      framework: "React",
      type: "Library",
      language: "JavaScript/TypeScript",
      performance: "High with optimization",
      learningCurve: "Moderate to steep",
      community: "Very large and active community with extensive ecosystem",
    },
    {
      id: '2',
      framework: "Vue.js",
      type: "Progressive Framework",
      language: "JavaScript/TypeScript",
      performance: "High performance out of the box",
      learningCurve: "Gentle learning curve for beginners",
      community: "Growing community with good documentation and tooling",
    },
    {
      id: '3',
      framework: "Angular",
      type: "Full Framework",
      language: "TypeScript primarily",
      performance: "Good with proper optimization techniques",
      learningCurve: "Steep learning curve due to complexity",
      community: "Large enterprise-focused community with comprehensive tooling",
    },
    {
      id: '4',
      framework: "Svelte",
      type: "Compiler",
      language: "JavaScript/TypeScript",
      performance: "Excellent performance with small bundle sizes",
      learningCurve: "Easy to learn with simple syntax",
      community: "Smaller but enthusiastic community with growing adoption",
    },
    {
      id: '5',
      framework: "Next.js",
      type: "Meta Framework",
      language: "JavaScript/TypeScript",
      performance: "Excellent with built-in optimizations",
      learningCurve: "Moderate if familiar with React",
      community: "Large community backed by Vercel with excellent documentation",
    },
  ]
  
  const frameworkHeaders = [
    {
      key: 'framework',
      header: 'Framework',
    },
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'language',
      header: 'Language',
    },
    {
      key: 'performance',
      header: 'Performance',
    },
    {
      key: 'learningCurve',
      header: 'Learning Curve',
    },
    {
      key: 'community',
      header: 'Community',
    },
  ];
  
  return (
    <GlobalTheme theme={theme}>
      <div className="v0plex-content">
        <div className="page-typography-content">
          <h1>Test 2</h1>
          <Theme as="section" theme={theme}>
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="/public#">
                  Breadcrumb 1
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem href="#">
                Breadcrumb 2
              </BreadcrumbItem>
              <BreadcrumbItem href="#">
                Breadcrumb 3
              </BreadcrumbItem>
              <BreadcrumbItem href="#">
                Breadcrumb 4
              </BreadcrumbItem>
            </Breadcrumb>
          </Theme>
          <p className="lead-text">
            A comprehensive exploration of modern JavaScript development patterns, best practices, and advanced techniques
            for building robust web applications.
          </p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/ZAz3rnLGthg?si=LuC_mQ5X4eak01WR"
                  title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>
          <h2>JavaScript Fundamentals</h2>
          <div className="table-responsive-wrapper">
          <Theme as="section" theme={theme}>
            <DataTable rows={jsConceptsRows} headers={jsConceptsHeaders}>
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <Table {...getTableProps()} size="md" stickyHeader={false} aria-label="javascript fundamentals table">
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => {
                        const headerProps = getHeaderProps({ header });
                        const { key, ...restHeaderProps } = headerProps;
                        return (
                          <TableHeader key={key} {...restHeaderProps}>
                            {header.header}
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const rowProps = getRowProps({ row });
                      const { key, ...restRowProps } = rowProps;
                      return (
                        <TableRow key={key} {...restRowProps}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </DataTable>
            
          </Theme>
          </div>
          
          <h2>Frontend Framework Comparison</h2>
          
          <p>
            Here's a comprehensive comparison of popular frontend frameworks with multiple columns to test table
            responsiveness:
          </p>
          <div className="table-responsive-wrapper">
          <Theme as="section" theme={theme}>
            <DataTable rows={frameworkRows} headers={frameworkHeaders}>
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <Table {...getTableProps()} size="md" stickyHeader={false} aria-label="frontend framework comparison table">
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => {
                        const headerProps = getHeaderProps({ header });
                        const { key, ...restHeaderProps } = headerProps;
                        return (
                          <TableHeader key={key} {...restHeaderProps}>
                            {header.header}
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const rowProps = getRowProps({ row });
                      const { key, ...restRowProps } = rowProps;
                      return (
                        <TableRow key={key} {...restRowProps}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </DataTable>
          </Theme>
          </div>
          
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
          
          <FakeCdsCardGrid columns={2}>
            <InfoCard title="Design Patterns" icon={<Code size={16}/>} clickable>
              <ul>
                <li>Module pattern</li>
                <li>Observer pattern</li>
                <li>Factory pattern</li>
                <li>Singleton pattern</li>
              </ul>
            </InfoCard>
            
            <InfoCard title="Performance Optimization" icon={<Dashboard size={16}/>} clickable>
              <ul>
                <li>Debouncing and throttling</li>
                <li>Lazy loading</li>
                <li>Memoization</li>
                <li>Virtual DOM concepts</li>
              </ul>
            </InfoCard>
          </FakeCdsCardGrid>
          
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
    </GlobalTheme>
  )
}