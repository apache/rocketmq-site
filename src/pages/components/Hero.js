import React from 'react'
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Translate, {translate} from '@docusaurus/Translate';
export default function Hero(){
    return(

     <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className={clsx("gradient-text",styles.herotitle)}>Apache RocketMQ</h1>
          <p className={clsx("hero__subtitle",styles.herosubtitle)}>
            <Translate id="rmq_intro">RocketMQ 5.0：云原生“消息、事件、流”实时数据处理平台，覆盖云边端一体化数据处理场景</Translate>
          </p>
          <div className={clsx('container',styles.github)}>
            <a class="github-button" href="https://github.com/apache/rocketmq"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-icon="octicon-star" data-size="large"
              data-show-count="true" aria-label="Star apache/rocketmq on GitHub">Star</a>
            &nbsp;&nbsp;
            <a class="github-button" href="https://github.com/apache/rocketmq/fork"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-icon="octicon-repo-forked" data-size="large" data-show-count="true"
              aria-label="Fork apache/rocketmq on GitHub">Fork</a>
          </div>

          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",styles.button
              )}
              to={"/docs/quickStart/01quickstart"}
            >
              <Translate id="快速开始">快速开始</Translate>
            </Link>
            <Link
              to="/version"
              className={clsx(
                "button button--outline button--secondary button--lg",styles.button2
              )}
            >
              <Translate id="RocketMQ 5.0 速览">RocketMQ 5.0 速览</Translate>
            </Link>
          </div>
        </div>
      </header>
    )
}