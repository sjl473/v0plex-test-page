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
import AlignedTable from '@/components/carbon_table/table';
import MathFormula from "@/components/math-formula";
import React from "react";

export default function IBMCarbonTable() {
  const {theme} = useTheme()
  
  const rows = [
    {
      id: 'a',
      name: 'Load balancer 1',
      status: 'Disabled',
    },
    {
      id: 'b',
      name: 'Load balancer 2',
      status: 'Starting',
    },
    {
      id: 'c',
      name: 'Load balancer 3',
      status: 'Active',
    },
  ];
  
  const headers = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'status',
      header: 'Status',
    },
  ];
  
  return (
    <>
      <GlobalTheme theme={theme}>
        <Theme as="section" theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            <AlignedTable>
              <DataTable rows={rows} headers={headers}>
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                  <Table {...getTableProps()} size={"sm"} stickyHeader={false}>
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
            </AlignedTable>
            
            <AlignedTable >
              <Table
                aria-label="sample table"
                size="lg" stickyHeader={false}
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
                    <TableCell><MathFormula formula="\sum_{i=1}^{n} i = \frac{n(n+1)}{2}" /></TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Load Balancer 4</TableCell>
                    <TableCell>Round robin</TableCell>
                    <TableCell>Disabled</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Load Balancer 5</TableCell>
                    <TableCell>Round robin</TableCell>
                    <TableCell>Disabled</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Load Balancer 6</TableCell>
                    <TableCell>Round robin</TableCell>
                    <TableCell>Disabled</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Load Balancer 7</TableCell>
                    <TableCell>Round robin</TableCell>
                    <TableCell>Disabled</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell>22</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
            </AlignedTable>
            <AlignedTable>
            
            </AlignedTable>
          </div>
        </div>
          </Theme>
      </GlobalTheme>
    </>
  )
}