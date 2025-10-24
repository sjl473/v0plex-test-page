"use client"

import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"
import MathFormula from "@/components/math-formula";
import React from "react";

export default function LinkExample() {
  const {theme} = useTheme()
  
  return (
    <GlobalTheme theme={theme}>
      <div className="v0plex-content">
        <div className="page-typography-content">
          
          <div>
            <br></br>
            <h1>v0plex components: @Math</h1>
            
            <div>
              <p>v0plex implements both inline math formular and block math formular.</p>
              <p>For example: We use <MathFormula formula="\vec{F}"/> to render a vector
                field, the divergence</p>
              <MathFormula
                formula="\nabla \cdot \vec{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}"
                display
              />
            </div>
          </div>
        </div>
      </div>
    
    </GlobalTheme>
  )
}

