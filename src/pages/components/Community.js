import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./Community.module.css";

import Translate, {translate} from '@docusaurus/Translate';
export default function Community() {
  return (
    <section className={styles.community}>
  
      <div className={styles.communitycontainer}>
     
        <h1 className={styles.communitytitle}> <Translate id="加入社区">加入社区</Translate></h1>
        
        <p className={styles.community_subtitle}>
        <Translate id="订阅邮件组，关注博客文章，参与线上下活动">
          订阅邮件组，关注博客文章，参与线上下活动</Translate>
        </p>
       
        
      
        <div>
          <Link
            className={clsx(
              "button button--outline button--secondary button--lg ",
              styles.buttoncommunity2
            )}
            to={"/contact"}
          ><Translate id="加入社区button">
            加入社区</Translate>
          </Link>
        </div>
        <div>
          <Link
            className={clsx(
              "button button--outline button--secondary button--lg",
              styles.buttoncommunity
            )}
            to={"/docs/contributionGuide/01how-to-contribute"}
          ><Translate id="贡献指南">
            贡献指南
            </Translate>
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
}


