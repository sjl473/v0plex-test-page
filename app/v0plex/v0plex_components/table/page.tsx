"use client"

import CodeBlock from "@/components/code-block"
import {GlobalTheme, Theme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import MathFormula from "@/components/math-formula";
import React from "react";

export default function IBMCarbonTable() {
  const {theme} = useTheme()
  
  const rows = [
    {
      id: 'a',
      name: 'Load balancer 1',
      status: 'Disabled',
      rule: 'Round robin',
      other: 'Test data',
    },
    {
      id: 'b',
      name: 'Load balancer 2',
      status: 'Starting',
      rule: 'DNS delegation',
      other: 'Test data',
    },
    {
      id: 'c',
      name: 'Load balancer 3',
      status: 'Active',
      rule: 'Round robin',
      other: 'Test data',
    },
    {
      id: 'd',
      name: 'Load balancer 4',
      status: 'Disabled',
      rule: 'DNS delegation',
      other: 'Test data',
    },
    {
      id: 'e',
      name: 'Load balancer 5',
      status: 'Active',
      rule: 'Round robin',
      other: 'Test data',
    },
  ];
  
  const simpleHeaders = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'status',
      header: 'Status',
    },
  ];
  
  const fullHeaders = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'rule',
      header: 'Rule',
    },
    {
      key: 'status',
      header: 'Status',
    },
    {
      key: 'other',
      header: 'Other',
    },
    {
      key: 'example',
      header: 'Example',
    },
  ];
  
  
  const complexRows = [
    {
      id: '1',
      name: 'Load Balancer 1',
      rule: 'Round robin',
      status: 'Starting',
      other: 'Test',
      example: '22',
    },
    {
      id: '2',
      name: 'Load Balancer 2',
      rule: 'DNS delegation',
      status: 'Active',
      other: 'Test',
      example: '22',
    },
    {
      id: '3',
      name: 'Load Balancer 3',
      rule: <CodeBlock inline language="TypeScript">Vector3D</CodeBlock>,
      status: <MathFormula formula="\sum_{i=1}^{n} i = \frac{n(n+1)}{2}"/>,
      other: 'Test',
      example: '22',
    },
    {
      id: '4',
      name: 'Load Balancer 4',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: '5',
      name: 'Load Balancer 5',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: '6',
      name: 'Load Balancer 6',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: '7',
      name: 'Load Balancer 7',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
  ];
  
  return (
    <>
      <GlobalTheme theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            <br></br>
            <h1>v0plex components: @DataTable</h1>
            <p>v0plex supports the IBM Carbon DataTable component with additional Math formulas and inline code blocks inserted in.</p>
            <h3>A simple DataTable with 3 rows (not in a sticky header)</h3>
            <div className="table-responsive-wrapper">
              <Theme as="section" theme={theme}>
                <DataTable rows={rows.slice(0, 3)} headers={simpleHeaders}>
                  {({rows, headers, getTableProps, getHeaderProps, getRowProps}) => (
                    <Table {...getTableProps()} size={"sm"} stickyHeader={false}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => {
                            const headerProps = getHeaderProps({header});
                            const {key, ...restHeaderProps} = headerProps;
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
                          const rowProps = getRowProps({row});
                          const {key, ...restRowProps} = rowProps;
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
            
            <h3>A complex DataTable with 7 rows (in a sticky header)</h3>
            <p>This might perform poorly on smaller screens, however it is considered as a feature in IBM carbon components</p>
            <div className="table-responsive-wrapper">
              <Theme as="section" theme={theme}>
                <DataTable rows={complexRows} headers={fullHeaders}>
                  {({rows, headers, getTableProps, getHeaderProps, getRowProps}) => (
                    <Table {...getTableProps()} size={"sm"} stickyHeader={true} aria-label="A complex table example">
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => {
                            const headerProps = getHeaderProps({header});
                            const {key, ...restHeaderProps} = headerProps;
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
                          const rowProps = getRowProps({row});
                          const {key, ...restRowProps} = rowProps;
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
            <h3>Another DataTable without a sticky header</h3>
            <div className="table-responsive-wrapper">
              <Theme as="section" theme={theme}>
                <Table
                  aria-label="sample table"
                  size="sm" stickyHeader={false}
                >
                  <TableHead>
                    <TableRow>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Rule</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Other</TableHeader>
                      <TableHeader>Example</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Load Balancer 1</TableCell>
                      <TableCell>Round robin</TableCell>
                      <TableCell>Starting</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Load Balancer 2</TableCell>
                      <TableCell>DNS delegation</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>22</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Load Balancer 3</TableCell>
                      <TableCell><CodeBlock inline
                                            language="TypeScript">Vector3D</CodeBlock></TableCell>
                      <TableCell><MathFormula formula="\sum_{i=1}^{n} i = \frac{n(n+1)}{2}"/></TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>22</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Theme>
            </div>
          </div>
        </div>
      </GlobalTheme>
    </>
  )
}