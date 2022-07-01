import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import LogoCarousel from "./components/LogoCarousel";
import Feature from "./components/Feature";

import Community from "./components/Community";
import Section from "./components/Section";
import Hero from "./components/Hero";
import { logos } from "../constants";


function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title} · ${siteConfig.tagline}`}
      description={`${siteConfig.tagline}`}
    >
      <Hero/>
      <main>
        <Section isDark>
         <Feature/>

         <div className="logosection">
          <Section>
            <LogoCarousel logos={logos}></LogoCarousel>
          </Section>
          </div>
        </Section>

        <Community />

      </main>
    </Layout>
  );
}

export default Home;
