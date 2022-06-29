import React from "react";
import clsx from "clsx";
import styles from "./Highlight.module.css";

export default function Community() {
  return (
    <section className={"highlightSection"}>
      <div className="container">
        <div className="row">
          <div className={"col col--6"}>
            <h3 className={"highlighttitle"}>关注Apache RocketMQ公众号</h3>
          </div>
          <div className={"col col--6"}>
            <h3 className={"highlighttitle"}>订阅Apache RocketMQ邮件组</h3>
          </div>
        </div>
        <div className="row">
          <div className={"col col--6"}>
            <img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h3o1ti46wgj20by0byq36.jpg"></img>
          </div>
          <div className={"col col--6"}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>订阅</th>
                  <th>存档</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User support and questions</td>
                  <td>
                    <a href="mailto:users-subscribe@rocketmq.apache.org">
                      Subscribe
                    </a>
                  </td>
                  <td>
                    <a href="https://lists.apache.org/list.html?users@rocketmq.apache.org">
                      Mail Archives
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Development related discussions</td>
                  <td>
                    <a href="mailto:dev-subscribe@rocketmq.apache.org">
                      Subscribe
                    </a>
                  </td>
                  <td>
                    <a href="https://lists.apache.org/list.html?dev@rocketmq.apache.org">
                      Mail Archives
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>All commits to repositories</td>
                  <td>
                    <a href="mailto:commits-subscribe@rocketmq.apache.org">
                      Subscribe
                    </a>
                  </td>
                  <td>
                    <a href="https://lists.apache.org/list.html?commits@rocketmq.apache.org">
                      Mail Archives
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <h3>参与线上下活动</h3>
       
         </div>
        
    </section>
  );
}
