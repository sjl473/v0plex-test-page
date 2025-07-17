"use client"

import {GlobalTheme, ListItem, Theme, UnorderedList} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function HomePage() {
  const {theme} = useTheme()
  
  return (
    <GlobalTheme theme={theme}>
      <div className="v0plex-content">
        <div className="page-typography-content">
          <h1 style={{
            fontWeight: 'medium',
            fontFamily: 'IBM Plex Mono',
            fontSize: '1rem',
            marginTop: '1rem',
            
          }}>bibliography</h1>
          
          <p className="lead-text"
             style={{fontFamily: 'IBM Plex Mono', fontWeight: '800', fontSize: '0.7rem'}}>
            "— Even AI bots have their own personal sites these days; human beings should get their own."
          </p>
          
          <h3>About This Site</h3>
          <p>
            Fin-tech blogs recording / other thoughts (in Chinese or English).
          </p>
          
          <h3>Working Experience</h3>
          
          <h6>0. Yong You Shanghai Ltd. Intern</h6>
          <Theme as="section" theme={theme}>
            <UnorderedList>
              <ListItem>Java desktop software developer</ListItem>
            </UnorderedList>
          </Theme>
          
          <h6>1. Ericsson DSE-RND-CBC, Dev-Ops Engineer</h6>
          <Theme as="section" theme={theme}>
            <UnorderedList>
              <ListItem>Maintaining various types of clusters (KE, KaaS, K3s)</ListItem>
              <ListItem>CI/CD operators: Jenkins, Spinnaker</ListItem>
              <ListItem>Jira and Confluence ticket handling</ListItem>
            </UnorderedList>
          </Theme>
          
          <h6>2. CEXIM</h6>
          <p style={{fontWeight: 'bold', fontSize: '0.8rem', paddingTop: '0.5rem'}}>2.1 Data Management
            Division</p>
          <Theme as="section" theme={theme}>
            <UnorderedList>
              <ListItem>Implementation & reporting sheets of JR_T0197 classification on data
                securities</ListItem>
              <ListItem>DLP (data leak prevention) requirements analysis
              </ListItem>
              <ListItem>Proposed 2021 version GDPR compliance to CEXIM Paris Branch (standard contractual
                clauses, controllers to processors)</ListItem>
            </UnorderedList>
          </Theme>
          <p style={{fontWeight: 'bold', fontSize: '0.8rem', paddingTop: '0.5rem'}}>2.2 Financial Products
            Development Division</p>
          <Theme as="section" theme={theme}>
            <UnorderedList>
              <ListItem>Regularly maintaining / operating urgent tickets on trading systems (mostly from commercial
                loans)</ListItem>
              <ListItem><p style={{color: 'var(--cds-link-primary)'}}>Currently: corporate credit rating
                system development</p></ListItem>
            </UnorderedList>
          </Theme>
          
          <h3>Education</h3>
          <p>
            BNBU / HKBU in Computer Science
          </p>

          <h3>Skills</h3>
          <Theme as="section" theme={theme}>
            <UnorderedList>
              <ListItem>Fluent in English & Mandarin
              </ListItem>
              <ListItem>Common IT abilities</ListItem>
              <ListItem>Random knowledge of semiconductors manufacturing and IC industries</ListItem>
            </UnorderedList>
          </Theme>
          
          <h3>Personal Interests</h3>
          <Theme as="section" theme={theme}>
            <UnorderedList>
              <ListItem>Aquarium keeping: passionate about freshwater aquariums and aquatic
                plants</ListItem>
              <ListItem>Clash Royale, Clash of Clans, Brawl Stars</ListItem>
              <ListItem>City Skylines I</ListItem>
              <ListItem>Guns N' Roses, Daft Punk, Chemical Brothers, Ye, Nirvana...</ListItem>
            </UnorderedList>
          </Theme>
        </div>
      </div>
    </GlobalTheme>
  )
}