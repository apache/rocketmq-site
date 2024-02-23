import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Head from '@docusaurus/Head';
import CodeBlock from "@theme/CodeBlock";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import LogoCarousel from "./components/LogoCarousel";
// import Feature from "./components/Feature";
import Highlight from "./components/Highlight";

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
      <Head>
        <meta http-equiv="Content-Security-Policy" content="frame-src *" />
      </Head>
      <Hero/>
      <main>
        <Section isDark>
         <Highlight/>

        </Section>

        <Community />

      </main>
    </Layout>
  );
}

export default Home;
