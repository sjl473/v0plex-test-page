"use client"

import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"
import CodeBlock from "@/components/code-block"

export default function CodeBlockExamplePage() {
  const {theme} = useTheme()
  
  return (
    <GlobalTheme theme={theme}>
      <div className="v0plex-content">
        <div className="page-typography-content">
          <br></br>
          <h1>v0plex components: @CodeBlock</h1>
          
          <p className="lead-text">
            v0plex supports code blocks implementation in tsx components.
          </p>
          
          <h3>A javascript code snippet showing line numbers</h3>
          
          <p>
            This includes support for loading code from code snippet files, often, code snippets are located
            in <CodeBlock inline>/public/code_examples</CodeBlock>.
          </p>
          
          <CodeBlock
            language="javascript"
            filePath="/code_examples/example_js_1.js"
            showLineNumbers={true}
          />
          
          <h3>A cplusplus code snippet not showing line numbers</h3>
          
          <CodeBlock
            language="cpp"
            filePath="/code_examples/llvm.cpp"
          />
          
          <h3>An inline Code snippet</h3>
          
          <p>
            Using <CodeBlock inline language="javascript">useState</CodeBlock> and
            <CodeBlock inline language="javascript">useEffect</CodeBlock> to manage state and side effects.
          </p>
          
          <h3>Directly passing text into tsx element</h3>
          
          <p>
            If you do not want to put code files in a folder, you can also pass the code directly, however, this is not
            recommended and you might need to use the escape character and they are not effective to input, such as
            inputting the following code directly as text might cause syntax errors.
          </p>
          
          <CodeBlock language="javascript">
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
        </div>
      </div>
    </GlobalTheme>
  )
}