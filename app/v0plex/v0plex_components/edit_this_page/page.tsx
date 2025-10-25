"use client"


import {Theme, GlobalTheme, ListItem, UnorderedList} from "@carbon/react";

import React from "react";

import "@carbon/charts/styles.css";

import {useTheme} from "@/components/theme-provider";
import EditThisPage from "@/components/edit-this-page";


export default function Test3Page() {
  const {theme} = useTheme();
  
  
  const NestedList = () => {
    return (
      <Theme as="section" theme={theme}>

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
          <EditThisPage githubLink="https://github.com/yourusername/v0plex-test-page/blob/main/app/v0plex/abt_v0p/future_works/page.tsx" />
        </div>
      </div>
    </GlobalTheme>
  )
}