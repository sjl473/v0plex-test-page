"use client"

import MathFormula from "@/components/math-formula"
import CodeBlock from "@/components/code-block"
import HighlightBox from "@/components/highlight-box"
import {Theme, GlobalTheme, ListItem, UnorderedList, Link, CodeSnippet} from "@carbon/react";
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from '@carbon/react'

import React from "react";
import { BulletChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import { ScaleTypes } from "@carbon/charts";
import { useTheme } from "@/components/theme-provider";


export default function Test3Page() {
    const { theme } = useTheme();
    
    const tableData = [
        {
            id: '1',
            component: <strong>Geometric Relationships</strong>,
            mathematicalFoundation: <MathFormula formula="x^2 + y^2 = z^2"/>,
            implementation: "Distance calculations, collision detection",
            visualization: "2D/3D graphics, game development",
        },
        {
            id: '2',
            component: <strong>Statistical Analysis</strong>,
            mathematicalFoundation: <MathFormula formula="\bar{x} = \frac{\sum x_i}{n}"/>,
            implementation: "Data processing, machine learning",
            visualization: "Charts, graphs, dashboards",
        },
        {
            id: '3',
            component: <strong>Signal Processing</strong>,
            mathematicalFoundation: (
              <MathFormula formula="F(\omega) = \int_{-\infty}^{\infty} f(t)e^{-i\omega t}dt"/>
            ),
            implementation: "Audio processing, image filtering",
            visualization: "Waveforms, spectrograms",
        },
    ]
    
    const headers = [
        {
            key: 'component',
            header: 'Component',
        },
        {
            key: 'mathematicalFoundation',
            header: 'Mathematical Foundation',
        },
        {
            key: 'implementation',
            header: 'Implementation',
        },
        {
            key: 'visualization',
            header: 'Visualization',
        },
    ];
    
    // 子弹图数据
    const bulletChartData = [
        {
            "title": "Item E",
            "group": "D3",
            "ranges": [350, 650, 980],
            "marker": 1575,
            "value": 400
        },
        {
            "title": "Item D",
            "group": "D2",
            "ranges": [750, 1200, null],
            "marker": 1725,
            "value": 2100
        },
        {
            "title": "Item C",
            "group": "D3",
            "ranges": [350, 500, 1005],
            "marker": 1340,
            "value": 550
        },
        {
            "title": "Item B",
            "group": "D1",
            "ranges": [300, 895, 1600],
            "marker": 1455,
            "value": 1000
        },
        {
            "title": "Item A",
            "group": "D1",
            "ranges": [800, 1000, 1400],
            "marker": 1275,
            "value": 250
        }
    ];
    
    // 列表组件 - 使用 Theme 组件包裹
    const NestedList = () => {
        return (
          <Theme as="section" theme={theme}>
              <UnorderedList isExpressive={false}>
                  <ListItem>
                      Unordered List level 1
                      <UnorderedList nested>
                          <ListItem>Unordered List level 2</ListItem>
                          <ListItem>
                              Unordered List level 2
                              <UnorderedList nested>
                                  <ListItem>Unordered List level 3</ListItem>
                                  <ListItem>Unordered List level 3</ListItem>
                              </UnorderedList>
                          </ListItem>
                      </UnorderedList>
                  </ListItem>
                  <ListItem>Unordered List level 1</ListItem>
                  <ListItem>Unordered List level 1</ListItem>
              </UnorderedList>
          </Theme>
        );
    }
    
    // 修改 bulletChartOptions
    const bulletChartOptions = {
        title: "Performance Metrics Visualization",
        axes: {
            bottom: {
                mapsTo: "value",
                extendLinearDomainBy: "marker"
            },
            left: {
                scaleType: ScaleTypes.LABELS,
                mapsTo: "title"
            },
            right: {
                scaleType: ScaleTypes.LABELS_RATIO,
                mapsTo: "title"
            }
        },
        height: "400px",
        theme: theme // 使用当前主题
    };
    
    return (
      <GlobalTheme theme={theme}>
          <div className="v0plex-content">
              <div className="page-typography-content">
                  <h1>Test 3</h1>
                  
                  <p className="lead-text">
                      An integrated approach to combining mathematical modeling, visual representation, and
                      computational
                      implementation for solving complex real-world problems.
                  </p>
                  
                  <h2>Mixed Content Integration</h2>
                  <div className="table-responsive-wrapper">
                  <Theme theme={theme}>
                      <DataTable rows={tableData} headers={headers}>
                          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                            <Table {...getTableProps()} size="lg" stickyHeader={false} aria-label="mixed content integration table">
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
                  <h3>Visual Representation</h3>
                  
                  <p>Combining mathematical concepts with visual elements enhances understanding and practical
                      application:</p>
                  
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
                  
                  <p>
                      Below is a practical implementation of a bullet chart using Carbon Charts,
                      demonstrating how mathematical data can be visually represented:
                  </p>
                  
                  <div className="bullet-chart-container">
                      <BulletChart
                        data={bulletChartData}
                        options={bulletChartOptions}
                      />
                  </div>
                  
                  <p className="chart-description">
                      This bullet chart visualizes performance metrics with:
                  </p>
                  
                  <div className="nested-list-container">
                      <NestedList/>
                  </div>
                  
                  <h3>Integrated Mathematical Modeling</h3>
                  
                  <p>
                      The combination <Link
                    href="#"
                  >
                      Link
                  </Link> of theoretical mathematics, computational implementation, and visual
                      representation creates
                      powerful tools for problem-solving:
                  </p>
                  
                  
                  <HighlightBox title="Practical Applications">
                      <p>
                          This integrated approach is essential in fields such as computer graphics, data science,
                          engineering
                          simulations, and financial modeling. The synergy between mathematical theory and
                          computational practice
                          enables sophisticated analysis and visualization of complex systems.
                      </p>
                  </HighlightBox>
                  
                  <h3>Advanced Mathematical Concepts</h3>
                  
                  <div>
                      <p>Complex mathematical relationships in computational contexts: For any vector
                          field <MathFormula formula="\vec{F}" inline={true}/>, the divergence</p>
                      <MathFormula
                        formula="\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}"
                        display
                      />
                  </div>
                  
                  <p>
                      This divergence operator is fundamental in vector calculus and has applications in fluid
                      dynamics,
                      electromagnetic field theory, and computer graphics rendering algorithms.
                  </p>
                  
                  <p>
                      You can create a vector field using <CodeBlock inline
                                                                     language="TypeScript">Vector3D</CodeBlock> type
                      or implement it with <CodeBlock inline
                                                      language="TypeScript">{`type VectorField = (p: Point) => Vector`}</CodeBlock>.
                  </p>
              </div>
          </div>
      </GlobalTheme>
    )
}