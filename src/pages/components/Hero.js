import React from 'react'
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Translate, {translate} from '@docusaurus/Translate';

export default function Hero(){
    return(
      <header className={styles.heroBanner}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>Apache Top-Level Project · Open Source</div>
            <h1 className={styles.heroTitle}>
              <span className={styles.gradient}>AI-Native</span> Asynchronous<br/>Communication Engine
            </h1>
            <p className={styles.heroDesc}>
              <Translate id="hero_desc">Purpose-built for multi-agent collaboration, AI inference scheduling, and MCP/session state management — battle-tested at trillion-message scale.</Translate>
            </p>
            <div className={styles.heroActions}>
              <Link
                className={styles.btnSolid}
                to={"/docs/quickStart/01quickstart"}
              >
                <Translate id="快速开始">Get Started</Translate>
              </Link>
              <Link
                className={styles.btnOutline}
                to={"/download"}
              >
                <Translate id="下载">Download</Translate>
              </Link>
            </div>
          </div>
        </div>
      </header>
    )
}