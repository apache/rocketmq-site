import React from 'react'
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./Hero.module.css";

export default function Hero(){
    return(

     <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className={clsx("gradient-text",styles.herotitle)}>RocketMQ</h1>
          <p className={clsx("hero__subtitle",styles.herosubtitle)}>
            致力打造金融级高可靠、高性能、低延迟的消息中间件服务，伴随云原生时代的到来，新一代5.0版本应运而生。
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
              to={"/docs"}
            >
              快速开始
            </Link>
            <Link
              to="/docs"
              className={clsx(
                "button button--outline button--secondary button--lg",styles.button2
              )}
            >
              RocketMQ 5.0 速览
            </Link>
          </div>
        </div>
      </header>
    )
}