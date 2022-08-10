import React from 'react'
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./Hero.module.css";
import Translate, {translate} from '@docusaurus/Translate';
export default function Hero(){
    return(

     <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className={clsx("gradient-text",styles.herotitle)}>RocketMQ</h1>
          <p className={clsx("hero__subtitle",styles.herosubtitle)}>
     A cloud native messaging and streaming platform, making it simple to build event-driven applications
          </p>
          <div className={clsx('container',styles.github)}>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=apache&repo=rocketmq&type=star&count=true&size=large"
              width="170"
              height="30"
              frameBorder="0"
              scrolling="0"
            ></iframe>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=apache&repo=rocketmq&type=fork&count=true&size=large"
              frameBorder="0"
              scrolling="0"
              width="170"
              height="30"
              title="GitHub"
            ></iframe>
          </div>

          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",styles.button
              )}
              to={"/docs/介绍/02quickstart"}
            >
              <Translate id="快速开始">快速开始</Translate>
            </Link>
            <Link
              to="/version"
              className={clsx(
                "button button--outline button--secondary button--lg",styles.button2
              )}
            >
              <Translate id="RocketMQ 5.0 速览"> RocketMQ 5.0 速览</Translate>
            </Link>
          </div>
        </div>
      </header>
    )
}