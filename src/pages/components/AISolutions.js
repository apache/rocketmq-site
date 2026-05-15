import React, { useState } from 'react';
import styles from './AISolutions.module.css';

const TABS = [
  { key: 'session', label: 'MCP & Session Management' },
  { key: 'ratelimit', label: 'Isolation & Rate Limiting' },
  { key: 'batch', label: 'Batch Consumption' },
  { key: 'multiagent', label: 'Multi-Agent Communication' },
];

function Lightbox({ src, alt, onClose }) {
  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.lightboxClose} onClick={onClose}>✕</button>
      <img
        src={src}
        alt={alt}
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function SolutionImage({ src, alt }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={styles.solutionVisual} onClick={() => setOpen(true)} style={{ cursor: 'zoom-in' }}>
        <img src={src} alt={alt} className={styles.solutionImg} />
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

function SessionPanel() {
  return (
    <div className={styles.solutionCard}>
      <div className={styles.solutionContent}>
        <h3>MCP & Long-Session State Continuity</h3>
        <div className={styles.solutionPain}>
          AI tasks are long-running and GPU-expensive. Unstable SSE/WebSocket connections cause session interruption, context loss, and wasted compute.
        </div>
        <ul className={styles.solutionList}>
          <li>Each session maps to a LiteTopic (<code>chat/&#123;sessionID&#125;</code>), keeping app servers completely stateless</li>
          <li>On reconnection to any node, subscribe to the same LiteTopic and resume from breakpoint</li>
          <li>Backend LLM tasks continue running — results persist regardless of frontend disconnection</li>
        </ul>
        <div className={styles.solutionValues}>
          <span className={styles.valueTag}>Session Continuity</span>
          <span className={styles.valueTag}>Zero Compute Waste</span>
          <span className={styles.valueTag}>Stateless Scaling</span>
        </div>
      </div>
      <SolutionImage
        src="/picture/v5/litetopic_session_practice.svg"
        alt="MCP & Long-Session State Continuity Architecture"
      />
    </div>
  );
}

function RateLimitPanel() {
  return (
    <div className={styles.solutionCard}>
      <div className={styles.solutionContent}>
        <h3>Fine-Grained Isolation & Rate Limiting</h3>
        <div className={styles.solutionPain}>
          Limited GPU capacity shared by massive users. A single user's burst traffic starves others. Traditional Topic/Partition schemes can't support million-level isolation.
        </div>
        <ul className={styles.solutionList}>
          <li>Route requests to isolated LiteTopics by user ID / model ID / task type — physical isolation, zero cross-tenant interference</li>
          <li>Consumer-side Suspend precisely pauses a single LiteTopic with ms-level rate limiting</li>
          <li>Cluster-level governance: identify top-traffic queues, suspend and gradually recover with elastic scaling</li>
        </ul>
        <div className={styles.solutionValues}>
          <span className={styles.valueTag}>Per-User Flow Control</span>
          <span className={styles.valueTag}>Physical Isolation</span>
          <span className={styles.valueTag}>Peak Shaving</span>
        </div>
      </div>
      <SolutionImage
        src="/picture/v5/litetopic_ratelimit_practice.svg"
        alt="Fine-Grained Isolation & Rate Limiting Architecture"
      />
    </div>
  );
}

function BatchPanel() {
  return (
    <div className={styles.solutionCard}>
      <div className={styles.solutionContent}>
        <h3>Batch Consumption — Unleash GPU Parallelism</h3>
        <div className={styles.solutionPain}>
          LLM Batch API inference costs only 50% of real-time inference. Per-message consumption wastes GPU parallel capacity.
        </div>
        <ul className={styles.solutionList}>
          <li>Native batch consumption: dual-trigger by count (maxNumMessages) + time (batchTimeout)</li>
          <li>PushConsumer BatchMessageListener for timely batching; SimpleConsumer batchReceive for active pacing</li>
          <li>Directly adapts to OpenAI-style Batch APIs, cutting inference costs by 50%</li>
        </ul>
        <div className={styles.solutionValues}>
          <span className={styles.valueTag}>GPU Utilization Maximized</span>
          <span className={styles.valueTag}>50% Cost Reduction</span>
          <span className={styles.valueTag}>Flexible Batching</span>
        </div>
      </div>
      <SolutionImage
        src="/picture/v5/litetopic_batch_practice.svg"
        alt="Batch Consumption Architecture"
      />
    </div>
  );
}

function MultiAgentPanel() {
  return (
    <div className={styles.solutionCard}>
      <div className={styles.solutionContent}>
        <h3>Multi-Agent Async Communication</h3>
        <div className={styles.solutionPain}>
          Long-running AI tasks in multi-agent systems cause thread blocking, cascade failures, and poor scalability with synchronous calls.
        </div>
        <ul className={styles.solutionList}>
          <li>Supervisor dispatches subtasks to worker Agents' Request Topics — fully async and decoupled</li>
          <li>Workers return results via Response LiteTopics (named by TaskID); Supervisor subscribes to receive</li>
          <li>LiteTopics auto-create/destroy; ordered messages guarantee streaming token consistency</li>
          <li>Compatible with MCP & A2A; adapters for LangChain, CrewAI, AutoGen, AgentScope, Dify, Coze</li>
        </ul>
        <div className={styles.solutionValues}>
          <span className={styles.valueTag}>Non-Blocking</span>
          <span className={styles.valueTag}>Task Isolation</span>
          <span className={styles.valueTag}>Framework Agnostic</span>
        </div>
      </div>
      <SolutionImage
        src="/picture/v5/litetopic_multiagent_practice.svg"
        alt="Multi-Agent Async Communication Architecture"
      />
    </div>
  );
}

const PANELS = {
  session: SessionPanel,
  ratelimit: RateLimitPanel,
  batch: BatchPanel,
  multiagent: MultiAgentPanel,
};

export default function AISolutions() {
  const [activeTab, setActiveTab] = useState('session');
  const ActivePanel = PANELS[activeTab];

  return (
    <>
      {/* Solutions Section */}
      <section className={styles.solutions} id="solutions">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>AI Solutions</div>
          <p className={styles.sectionDesc}>Classic scenario solutions for agentic AI systems</p>
        </div>

        <div className={styles.tabNav}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabPanel}>
          <ActivePanel />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Core Features</div>
          <p className={styles.sectionDesc}>The underlying capabilities that make enterprise AI communication reliable, fast, and effortless.</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h4>LiteTopic — Million-Scale</h4>
            <ul>
              <li>Million-level LiteTopics per cluster, auto-created on demand</li>
              <li>TTL-based auto-expiration, zero manual maintenance</li>
              <li>Per-consumer selective subscription within same group</li>
              <li>Strict ordering within each LiteTopic</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📦</div>
            <h4>Batch Consumption</h4>
            <ul>
              <li>Dual-trigger: message count + time window</li>
              <li>PushConsumer & SimpleConsumer dual-mode</li>
              <li>Native fit for LLM Batch API paradigms</li>
              <li>Adaptive pacing for varying throughput</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎛️</div>
            <h4>Fine-Grained Flow Control</h4>
            <ul>
              <li>Per-LiteTopic Suspend/Resume at consumer level</li>
              <li>Millisecond-level rate limiting, isolated impact</li>
              <li>Smooth traffic curves with elastic scaling</li>
              <li>Cluster-wide top-N queue governance</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h4>High Reliability & HA</h4>
            <ul>
              <li>Durable persistence + offset management</li>
              <li>Multi-replica sync replication, cross-region DR</li>
              <li>Auto failover, financial-grade transactions</li>
              <li>Breakpoint recovery for AI workflows</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>☁️</div>
            <h4>Cloud-Native Architecture</h4>
            <ul>
              <li>Compute-storage separation, stateless Proxy</li>
              <li>Kubernetes-native, infinite elastic scaling</li>
              <li>gRPC SDK: Java / Go / Python / C++ / Rust</li>
              <li>Trillion-level throughput, 10M+ TPS proven</li>
            </ul>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔗</div>
            <h4>Protocol & Ecosystem</h4>
            <ul>
              <li>MCP (Model Context Protocol) native support</li>
              <li>A2A (Agent-to-Agent) protocol compatible</li>
              <li>LangChain, CrewAI, AutoGen, AgentScope</li>
              <li>Framework-agnostic: Dify, Coze, and more</li>
            </ul>
          </div>
        </div>

        {/* Also Included */}
        <div className={styles.alsoIncluded}>
          <div className={styles.alsoIncludedTitle}>Also Included — Classic Integration Capabilities</div>
          <div className={styles.alsoIncludedGrid}>
            <div className={styles.alsoIncludedItem}>
              <h5>EventBridge</h5>
              <p>CloudEvents-compatible event bus for cross-platform routing and Serverless integration.</p>
            </div>
            <div className={styles.alsoIncludedItem}>
              <h5>MQTT</h5>
              <p>Native IoT protocol support for massive device connectivity and cloud-edge collaboration.</p>
            </div>
            <div className={styles.alsoIncludedItem}>
              <h5>RocketMQ Connect</h5>
              <p>Low-code data integration connecting 50+ sources for streaming ETL pipelines.</p>
            </div>
            <div className={styles.alsoIncludedItem}>
              <h5>RocketMQ Streams</h5>
              <p>Lightweight stream processing engine with Flink SQL compatibility.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
