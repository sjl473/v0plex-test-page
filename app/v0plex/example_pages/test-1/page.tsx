"use client"

import MathFormula from "@/components/math-formula"
import CodeBlock from "@/components/code-block"
import InfoCard from "@/components/info-card"
import FakeCdsCardGrid from "@/components/fake-cds-card-grid"
import HighlightBox from "@/components/highlight-box"
import { ChartLine, Code } from "@carbon/icons-react"
import { GlobalTheme, Theme } from "@carbon/react"
import { useTheme } from "@/components/theme-provider"
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react'


export default function Test1Page() {
  const { theme } = useTheme()
  
  const tableData = [
    {
      Concept: <strong>Energy-Mass Equivalence</strong>,
      Formula: <MathFormula formula="E = mc^2" />,
      Application: "Fundamental principle in physics and nuclear energy calculations",
    },
    {
      Concept: <strong>Arithmetic Series</strong>,
      Formula: <MathFormula formula="\sum_{i=1}^{n} i = \frac{n(n+1)}{2}" />,
      Application: "Algorithm complexity analysis and optimization problems",
    },
    {
      Concept: <strong>Exponential Growth</strong>,
      Formula: <MathFormula formula="f(x) = ae^{bx}" />,
      Application: "Population modeling, compound interest, and growth algorithms",
    },
  ]
  
  return (
    <>
      <GlobalTheme theme={theme}>
        <Theme as="section" theme={theme}>
          <div className="v0plex-content">
            <div className="page-typography-content">
              <h1>Test 1</h1>
              
              <p className="lead-text">
                This comprehensive guide explores fundamental mathematical concepts and their practical applications in modern
                computational systems and algorithm design.
              </p>
              
              <h2>Mathematical Foundations</h2>

                <Table
                  aria-label="mathematical concepts table"
                  size="sm"
                  stickyHeader={false}
                >
                  <TableHead>
                    <TableRow>
                      <TableHeader>Concept</TableHeader>
                      <TableHeader>Formula</TableHeader>
                      <TableHeader>Application</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.Concept}</TableCell>
                        <TableCell>{row.Formula}</TableCell>
                        <TableCell>{row.Application}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              
              <h3>Implementation Example</h3>
              
              <p>Here's how these mathematical concepts translate into practical programming solutions:</p>
              
              <CodeBlock language="JavaScript">
                {`
function calculateEnergy(mass, speedOfLight = 299792458) {
  return mass * Math.pow(speedOfLight, 2);
}


function arithmeticSum(n) {
  return (n * (n + 1)) / 2;
}


const mass = 0.001;
const energy = calculateEnergy(mass);
console.log(\`Energy: \${energy} joules\`);

const sum = arithmeticSum(100);
console.log(\`Sum of first 100 numbers: \${sum}\`);`}
              </CodeBlock>
              
              <h3>Advanced Applications</h3>
              
              <FakeCdsCardGrid columns={2}>
                <InfoCard title="Physics Simulations" icon={<ChartLine size={16} />} clickable>
                  <ul>
                    <li>Particle physics calculations</li>
                    <li>Relativistic mechanics</li>
                    <li>Quantum field theory</li>
                    <li>Nuclear reaction modeling</li>
                  </ul>
                </InfoCard>
                
                <InfoCard title="Computer Science" icon={<Code size={16} />} clickable>
                  <ul>
                    <li>Algorithm complexity analysis</li>
                    <li>Data structure optimization</li>
                    <li>Machine learning algorithms</li>
                    <li>Cryptographic systems</li>
                  </ul>
                </InfoCard>
              </FakeCdsCardGrid>
              
              <HighlightBox title="Key Insight">
                <p>
                  Mathematical formulas provide the foundation for computational algorithms. Understanding both the
                  theoretical basis and practical implementation enables developers to create efficient, scalable solutions
                  for complex problems.
                </p>
              </HighlightBox>
            </div>
          </div>
        </Theme>
      </GlobalTheme>
    </>
  )
}