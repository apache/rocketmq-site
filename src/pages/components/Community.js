import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./Community.module.css";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());
export default function Community() {
  return (
    <section className={styles.community}>
  
      <div className={styles.communitycontainer}>
     
        <h1 className={styles.communitytitle}>加入社区</h1>
        
        <p className={styles.community_subtitle}>
          订阅邮件组，关注博客文章，参与线上下活动
        </p>
       
        
      
        <div>
          <Link
            className={clsx(
              "button button--outline button--secondary button--lg ",
              styles.buttoncommunity2
            )}
            to={"/contact"}
          >
            加入社区
          </Link>
        </div>
        <div>
          <Link
            className={clsx(
              "button button--outline button--secondary button--lg",
              styles.buttoncommunity
            )}
            to={"/docs/贡献指南/29how-to-contribute"}
          >
            贡献指南
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
}


