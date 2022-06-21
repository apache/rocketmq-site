import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import LogoCarousel from "./components/LogoCarousel";
import Feature from "./components/Feature";
import Section from "./components/Section";
import Highlight from "./components/Highlight";

import styles from "./styles.module.css";
import {
  logos,
  features,
  LHIntregrationExample,
  SetupExample,
  ReactIntegration,
} from "../constants";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title} · ${siteConfig.tagline}`}
      description={`${siteConfig.tagline}`}
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="gradient-text">RocketMQ</h1>
          <p className="hero__subtitle">
            致力打造金融级高可靠、高性能、低延迟的消息中间件服务，伴随云原生时代的到来，新一代5.0版本应运而生。
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("/docs")}
            >
              快速开始
            </Link>
            <Link
              to="/docs"
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
            >
              RocketMQ 5.0 速览
            </Link>
          
            <Link
              to="/blog/tags/用户案例"
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
            >
              用户案例
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Section isDark>
          <Highlight
            img={
              <CodeBlock className="bash" children={SetupExample}></CodeBlock>
            }
            reversed
            title="RocketMQ 作为主流的分布式消息中间件，于 2012 年开源，并在 2017 年成为 Apache 顶级项目"
            text={
              <>
                <p>
                  RocketMQ, the leading distributed messaging middleware, was
                  open sourced in 2012 and officially became an Apache top-level
                  project in 2017
                </p>
              </>
            }
            link="了解更多"
            url = "/docs/03whatis"
          />
          <Highlight
            img={
              <CodeBlock className="bash" children={SetupExample}></CodeBlock>
            }
            // reversed
            title="大规模负载下低延迟，保证万亿级的信息容量,适用于电商领域，金融领域，大数据领域，物联网"
            text={
              <>
                <p>
                  With low latency under massive loads, trillions of information
                  capacity is guaranteed.Programming models for e-commerce,
                  finance, big data and the Internet of Things
                </p>
              </>
            }
            link="用户案例"
            url="/blog/tags/用户案例"
          />
         
          <Highlight
            img={
              <iframe
                width="900"
                height="315"
                src="https://player.bilibili.com/player.html?aid=547473448&bvid=BV1bq4y1M71y&cid=393522883&page=1"
                scrolling="no"
                border="0" frameborder="no" framespacing="0"
                allowfullscreen="true"
              />
              
            }
            reversed
            title="RocketMQ发布5.0版本包括：全新的消费模型，服务端负载均衡，无损弹性扩缩，可分可合的存储计算分离等"
            text={
              <>
                <p>
                  RocketMQ Release 5.0: Major Architecture Refactoring, Storage
                  Compute Separation, Event Streaming
                </p>
              </>
            }
            link="Rocket 5.0 速览"
            url="/docs/32release-manual"
          />
          

          <Section>
          
            <LogoCarousel logos={logos}></LogoCarousel>
          
          </Section>
        </Section>


{/* 
        {features && features.length > 0 && (
          <Section isDark>
            {features.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </Section>
        )} */}





      </main>
    </Layout>
  );
}

export default Home;
