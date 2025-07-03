"use client"

import MathFormula from "@/components/math-formula"
import CodeBlock from "@/components/code-block"
import ContentTable from "@/components/content-table"
import InfoCard from "@/components/info-card"
import CardGrid from "@/components/card-grid"
import HighlightBox from "@/components/highlight-box"
import { ChartLine, Code } from "@carbon/icons-react"

export default function Test3Page() {
  const tableData = [
    {
      Component: <strong>Geometric Relationships</strong>,
      "Mathematical Foundation": <MathFormula formula="x^2 + y^2 = z^2" />,
      Implementation: "Distance calculations, collision detection",
      Visualization: "2D/3D graphics, game development",
    },
    {
      Component: <strong>Statistical Analysis</strong>,
      "Mathematical Foundation": <MathFormula formula="\bar{x} = \frac{\sum x_i}{n}" />,
      Implementation: "Data processing, machine learning",
      Visualization: "Charts, graphs, dashboards",
    },
    {
      Component: <strong>Signal Processing</strong>,
      "Mathematical Foundation": (
        <MathFormula formula="F(\omega) = \int_{-\infty}^{\infty} f(t)e^{-i\omega t}dt" />
      ),
      Implementation: "Audio processing, image filtering",
      Visualization: "Waveforms, spectrograms",
    },
  ]

  
  return (
    <div className="v0plex-content">
      <div className="page-typography-content">
        <h1>Test 3</h1>

        <p className="lead-text">
          An integrated approach to combining mathematical modeling, visual representation, and computational
          implementation for solving complex real-world problems.
        </p>

        <h2>Mixed Content Integration</h2>

        <ContentTable
          headers={["Component", "Mathematical Foundation", "Implementation", "Visualization"]}
          rows={tableData}
        />

        <h3>Visual Representation</h3>

        <p>Combining mathematical concepts with visual elements enhances understanding and practical application:</p>

        <img
          src="/placeholder.svg?height=200&width=400"
          alt="Mathematical visualization example"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "200px",
            objectFit: "cover",
            margin: "1.5rem 0",
            border: "1px solid var(--v0plex-border-subtle)",
          }}
        />

        <h3>Computational Implementation</h3>

        <CardGrid columns={2}>
          <InfoCard title="Python Scientific Computing" icon={<ChartLine size={16} />} clickable>
            <p style={{ marginBottom: "1rem" }}>Leveraging NumPy and SciPy for mathematical operations:</p>
            <CodeBlock language="Python">
              {`import numpy as np
import matplotlib.pyplot as plt

# Pythagorean theorem implementation
def calculate_hypotenuse(a, b):
    """Calculate hypotenuse using Pythagorean theorem"""
    return np.sqrt(a**2 + b**2)

# Generate data for visualization
x = np.linspace(0, 10, 100)
y = np.sin(x) * np.exp(-x/5)

# Create visualization
plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.title('Damped Sine Wave')
plt.xlabel('Time')
plt.ylabel('Amplitude')
plt.grid(True, alpha=0.3)
plt.show()

print("Calculation complete")`}
            </CodeBlock>
          </InfoCard>

          <InfoCard title="JavaScript Visualization" icon={<Code size={16} />} clickable>
            <p style={{ marginBottom: "1rem" }}>Creating interactive visualizations with modern web technologies:</p>
            <CodeBlock language="JavaScript">
              {`
class MathVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }
  
  drawPythagoreanTriangle(a, b) {
    const c = Math.sqrt(a * a + b * b);
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = '#0f62fe';
    this.ctx.lineWidth = 2;
    
    
    this.ctx.beginPath();
    this.ctx.moveTo(50, this.height - 50);
    this.ctx.lineTo(50 + a * 10, this.height - 50);
    this.ctx.lineTo(50 + a * 10, this.height - 50 - b * 10);
    this.ctx.closePath();
    this.ctx.stroke();
    
    
    this.ctx.fillStyle = '#161616';
    this.ctx.font = '14px IBM Plex Sans';
    this.ctx.fillText(\`a = \${a}\`, 25, this.height - 25);
    this.ctx.fillText(\`b = \${b}\`, 60 + a * 10, this.height - 30 - b * 5);
    this.ctx.fillText(\`c = \${c.toFixed(2)}\`, 30 + a * 5, this.height - 60 - b * 5);
  }
}


const visualizer = new MathVisualizer('mathCanvas');
visualizer.drawPythagoreanTriangle(3, 4);`}
            </CodeBlock>
          </InfoCard>
        </CardGrid>

        <h3>Integrated Mathematical Modeling</h3>

        <p>
          The combination of theoretical mathematics, computational implementation, and visual representation creates
          powerful tools for problem-solving:
        </p>

        <HighlightBox title="Practical Applications">
          <p>
            This integrated approach is essential in fields such as computer graphics, data science, engineering
            simulations, and financial modeling. The synergy between mathematical theory and computational practice
            enables sophisticated analysis and visualization of complex systems.
          </p>
        </HighlightBox>

        <h3>Advanced Mathematical Concepts</h3>

        <div >
          <p>Complex mathematical relationships in computational contexts: For any vector field <MathFormula formula="\vec{F}" inline={true} />, the divergence</p>
          <MathFormula
              formula="\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}"
              display
          />
        </div>

        <p>
          This divergence operator is fundamental in vector calculus and has applications in fluid dynamics,
          electromagnetic field theory, and computer graphics rendering algorithms.
        </p>

        <p>
          You can create a vector field using <CodeBlock inline language="TypeScript">Vector3D</CodeBlock> type
          or implement it with <CodeBlock inline language="TypeScript">type VectorField = (p: Point) => Vector</CodeBlock>.
        </p>
      </div>
    </div>
  )
}
