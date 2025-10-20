"use client"


import {Theme, GlobalTheme, ListItem, UnorderedList} from "@carbon/react";

import React from "react";

import "@carbon/charts/styles.css";

import {useTheme} from "@/components/theme-provider";


export default function Test3Page() {
  const {theme} = useTheme();
  
  
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
  
  return (
    <GlobalTheme theme={theme}>
      <div className="v0plex-content">
        <div className="page-typography-content">
          <br></br>
          <h1>v0plex component: @UnorderedList</h1>
          
          <p>
            v0plex uses the Carbon Design System's UnorderedList component to create a structured list.
          </p>
          
          <div className="nested-list-container">
            <NestedList/>
          </div>
        
        
        </div>
      </div>
    </GlobalTheme>
  )
}