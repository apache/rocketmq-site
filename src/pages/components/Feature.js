import React from "react";
import Highlight from "./Highlight";
import Lottie from 'react-lottie-player'
import lottieJson3 from './110571-myfirstaniamtion.json'
import lottieJson2 from './76888-color-data-analysis.json'
import lottieJson1 from './35172-rocket.json'
import styles from "./Feature.module.css";

export default function Feature() {
  return (
    <div> 
    <div className={styles.mobileFeature}>
      <div>
      <h3>
        RocketMQ 作为主流的分布式消息中间件，于 2012 年开源，并在 2017
        年成为Apache 顶级项目
      </h3>
      <p>
        RocketMQ, the leading distributed messaging middleware, was open
        sourced in 2012 and officially became an Apache top-level project in
        2017
      </p>
    </div>
    <h3>
      大规模负载下低延迟，保证万亿级的信息容量,适用于电商领域，金融领域，大数据领域，物联网
    </h3>
    <p>
      With low latency under massive loads, trillions of information capacity
      is guaranteed.Programming models for e-commerce, finance, big data and
      the Internet of Things
    </p>
    <div></div>
    <div>
      <h3>
      RocketMQ发布5.0版本包括：全新的消费模型，服务端负载均衡，无损弹性扩缩，可分可合的存储计算分离等
      </h3>
      <p>
      RocketMQ Release 5.0: Major Architecture Refactoring, Storage
            Compute Separation, Event Streaming
      </p>
    </div>
  </div>
    <div className={styles.webFeature}>
      
      <Highlight
        img={
          <Lottie
          loop
          animationData={lottieJson1}
          play
          style={{ width: 400, height: 400, marginTop: -100, marginLeft:30 }}></Lottie>
        }
        reversed
        title="RocketMQ 作为主流的分布式消息中间件，于 2012 年开源，并在 2017 年成为 Apache 顶级项目"
        text={
          <>
            <p>
              RocketMQ, the leading distributed messaging middleware, was open
              sourced in 2012 and officially became an Apache top-level project
              in 2017
            </p>
          </>
        }
        link="了解更多"
        url="/info"
      />
      <Highlight
        img={
          <Lottie
          loop
          animationData={lottieJson2}
          play
          style={{ width: 400, height: 400, marginLeft:50,marginTop:-30 }}></Lottie>
        }
        reversed
        title="大规模负载下低延迟，保证万亿级的信息容量,适用于电商领域，金融领域，大数据领域，物联网"
        text={
          <>
            <p>
              With low latency under massive loads, trillions of information
              capacity is guaranteed.Programming models for e-commerce, finance,
              big data and the Internet of Things
            </p>
          </>
        }
        link="用户案例"
        url="/blog"
      />
     
      <Highlight
        img={
          <Lottie
      loop
      animationData={lottieJson3}
      play
      style={{ width: 700, height: 700, marginTop:-230, marginLeft:-70, }}
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
        link="RocketMQ 5.0 速览"
        url="/version"
      />
    </div>
  </div>
  
  );
}
