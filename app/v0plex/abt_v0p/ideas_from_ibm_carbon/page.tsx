
"use client"

import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function IdeasFromIBMCarbonPage() {
  const {theme} = useTheme()
  
  return (
    <>
      <style jsx>{`
        h1 {
          font-size: 3rem;
          color: ${theme === 'white' ? '#491d8b' : '#be95ff'};
        }

        h4 {
          color: ${theme === 'g100' ? '#78a9ff' : '#002d9c'};
        }

        strong {
          color: ${theme === 'white' ? '#740937' : '#ffafd2'};
        }
      `}</style>
      
      <GlobalTheme theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            
            <h1>v0plex: A Next.js Theme Copied From IBM Carbon Design</h1>
            <p style={{fontFamily: 'IBM Plex Mono', fontSize: '0.6rem', color: theme === 'g100' ? '#78a9ff' : '#002d9c'}}>v0plex is a blog page built with Next.js and IBM Plex fonts, copying the IBM Carbon Design System.</p>
            <p style={{fontFamily:"IBM Plex Mono", fontSize: '0.6rem', fontWeight: 'bold'}}>last updated: 07-18, 2025</p>
            <p>
              I'm not an IBM employee or frontend expert, but I quickly saw that Carbon Design beats other design systems. I decided I had to use this framework, or I wouldn't bother making a personal website. Why am I so stubborn? Here's why.
            </p>
            <p>Since flat and component-based UI got popular (like Bootstrap), designers have chased colorful and responsive layouts. They add colors, borders, and padding to make HTML and CSS elements look better. The internet boom also meant the same web page had to work on both desktop and mobile. Starting with iPhone and Google Material UI, designers focused more on smooth element animations, which also changed mobile app design. After React and Vue became popular, many internet companies open-sourced their design systems with JSX and Vue wrappers, like Ant Design and Element UI. These two UIs are widely used in apps at companies of all sizes and have been well tested in real projects.</p>
            <p>Frontend updates way faster than backend - countless JS tech stacks change every three months. Users don't care about these low-level details; they care about how the product feels. Too many frontend frameworks also make developers feel burnt out. But users get even more burnt out by the products themselves. Too many design systems don't bring new ideas - just different white and blue buttons with messy layouts, constantly changing the wrapper but repeating the same stuff. No matter which company on Earth, this just shows how boring and empty the information age has become.</p>
            <p>How do you make a product stand out? At the component design level, frequent updates don't matter much anymore. Component design updates hit their limit long ago. Modern products should focus on what really matters.</p>
            <p>Since ancient humans made cave paintings, they had to decide where to put them. If there's a huge rock in front of you, would you paint in the middle or top-left? Psychologically, where you paint sends a message. Starting from the top-left versus the middle means different things. Taking up the whole space versus a small corner also means different things. All of this is about layout - not components, not UI, not typography. Layout is about visual perception, basically subconscious stuff.</p>
            <p>IBM's Carbon Design has strict rules for three things: Grid, Motion, and Typography. That's its main strength. For example, its Grid system doesn't just define column widths - it strictly says how content should line up with grid lines, including text baselines and element edges. Motion has clear rules for how long animations last and what easing curves to use. Typography has detailed rules for font sizes, line heights, letter spacing, and even text length in different situations. Many popular systems (like Ant Design or Element UI) are way looser about this stuff. They might give you basic grid tools but don't force you to position elements precisely, so pages end up looking scattered.</p>
            <p>The strict Layout rules are what I love most. Most design languages have grids, but they just divide page widths mechanically without saying that text edges must line up exactly with grid corners. It's like expert designers crushing amateur designers, because experts know that nautilus spirals follow math formulas, and rivers, lightning, and trees are just 3D versions of mathematical shapes. Amateur designers never follow principles and think "good enough" is fine.</p>
            <p>As someone who's not a frontend developer, sticking to strict grids and spacing and making elements line up perfectly is both design and self-expression. This isn't being rigid - it's a way to stand out among boring products, even if that product is just a small blog. That's what IBM Carbon Design taught me.</p>
          </div>
        </div>
      </GlobalTheme>
    </>
  )
}