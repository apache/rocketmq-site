import React from "react";
import Highlight from "./Highlight";
import Lottie from 'react-lottie-player'
import lottieJson3 from './110571-myfirstaniamtion.json'
import lottieJson2 from './76888-color-data-analysis.json'
import lottieJson1 from './35172-rocket.json'
import styles from "./Feature.module.css";
import Translate, {translate} from '@docusaurus/Translate';
export default function Feature() {
  return (
    <div>
      <Highlight/>
    {/* <div className={styles.mobileFeature}>
      <div> */}
      {/* <h3>
      <Translate id="feature1ch">
        RocketMQ 作为主流的分布式消息中间件，于 2012 年开源，并在 2017
        年成为Apache 顶级项目
        </Translate>
      </h3>
      <p>
      <Translate id="feature1en">
        RocketMQ, the leading distributed messaging middleware, was open
        sourced in 2012 and officially became an Apache top-level project in
        2017
        </Translate>
      </p>
    </div>
    <h3>
    <Translate id="feature2ch">
      大规模负载下低延迟，保证万亿级的信息容量,适用于电商领域，金融领域，大数据领域，物联网
      </Translate>
    </h3>
    <p>
    <Translate id="feature2en">
      With low latency under massive loads, trillions of information capacity
      is guaranteed.Programming models for e-commerce, finance, big data and
      the Internet of Things
      </Translate>
    </p>
    <div></div>
    <div>
      <h3>
      <Translate id="feature3ch">
      RocketMQ发布5.0版本包括：全新的消费模型，服务端负载均衡，无损弹性扩缩，可分可合的存储计算分离等
      </Translate>
      </h3>
      <p>
      <Translate id="feature3en">
      RocketMQ Release 5.0: Major Architecture Refactoring, Storage
            Compute Separation, Event Streaming
            </Translate>
      </p>
    </div>
  </div> */}
    {/* <div className={styles.webFeature}>
      
      <Highlight
        img={
        }
        reversed
        title=  {translate({
          message: "云原生",
          description: 'The homepage icon alt message',
        })}
        
    
        text={
          <>
            <p>
              RocketMQ, the leading distributed messaging middleware, was open
              sourced in 2012 and officially became an Apache top-level project
              in 2017
            </p>
          </>
        }
        link={translate({ message: "了解更多"})}
        url="/info"
      />
      <Highlight
        img={
        }
        reversed
        title= {translate({
              message: "高吞吐",
              description: 'The homepage icon alt message',
            })}
        
        text={
          <>
            <p>
              With low latency under massive loads, trillions of information
              capacity is guaranteed.Programming models for e-commerce, finance,
              big data and the Internet of Things
            </p>
          </>
        }
        link={translate({ message: "用户案例"})}
        url="/blog"
      />
     
      <Highlight
        img={
        }
        reversed
        title={translate({
          message: "低时延",
          description: 'The homepage icon alt message',
        })}
        
        text={
          <>
          
            <p>
              RocketMQ Release 5.0: Major Architecture Refactoring, Storage
              Compute Separation, Event Streaming
            </p>
            
          </>
          
        }
        link={translate({ message:"RocketMQ 5.0 速览" })}
        url="/version"
      />

      <Highlight
        img={
        }
        reversed
        title={translate({
          message: "金融级",
          description: 'The homepage icon alt message',
        })}
        
        text={
          <>
          
            <p>
              RocketMQ Release 5.0: Major Architecture Refactoring, Storage
              Compute Separation, Event Streaming
            </p>
            
          </>
          
        }
        link={translate({ message:"RocketMQ 5.0 速览" })}
        url="/version"
      />

      <Highlight
        img={
        }
        reversed
        title={translate({
          message: "架构极简",
          description: 'The homepage icon alt message',
        })}
        
        text={
          <>
          
            <p>
              RocketMQ Release 5.0: Major Architecture Refactoring, Storage
              Compute Separation, Event Streaming
            </p>
            
          </>
          
        }
        link={translate({ message:"RocketMQ 5.0 速览" })}
        url="/version"
      />

      <Highlight
        img={
        }
        reversed
        title={translate({
          message: "生态友好",
          description: 'The homepage icon alt message',
        })}
        
        text={
          <>
          
            <p>
              RocketMQ Release 5.0: Major Architecture Refactoring, Storage
              Compute Separation, Event Streaming
            </p>
            
          </>
          
        }
        link={translate({ message:"RocketMQ 5.0 速览" })}
        url="/version"
      />
    </div> */}
  </div>
  
  );
}
