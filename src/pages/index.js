import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Hero from "./components/Hero";
import AISolutions from "./components/AISolutions";
import Community from "./components/Community";


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
        <AISolutions />
        <Community />
      </main>
    </Layout>
  );
}

export default Home;
