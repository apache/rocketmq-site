# Security

## Security Model

The Apache RocketMQ project itself provides security features such as ACL and TLS, but the final security effectiveness still depends on the operator’s comprehensive protection of **network, hosts, accounts, and data**.

### 1. Authentication and Authorization (ACL)

- ACL 1.0 has been supported since RocketMQ 4.4.0
- The more secure **ACL 2.0** was introduced in 5.3.0
- ACL 1.0 was removed in 5.3.3
- It is recommended that all users who use Apache RocketMQ ACL migrate to **ACL 2.0**

### 2. Dashboard  &  Observability Exposure

RocketMQ Dashboard and some observability components (such as RocketMQ Prometheus Exporter) do **not** enable strong authentication by default; anyone who can access the HTTP port can read cluster metadata. Strongly recommended:

- Bind the Dashboard listening address to the intranet or a trusted VPC
- Configure ACL / IP allow-lists on the gateway / Ingress / reverse proxy
- If public-network operation and maintenance is required, be sure to add a VPN, HTTP Basic/OAuth authentication, or a WAF

> Otherwise, information-leakage risks may occur; such risks are the responsibility of the deployment side rather than RocketMQ vulnerabilities.

### 3. Transport Encryption and Data Encryption

- Clients and servers can communicate through **TLS** encryption; enable it if sensitive data is involved
- The message body is defined by the business; RocketMQ will **not** parse or persist decrypted content
- If messages contain sensitive information, perform field-level or overall encryption on the business side to avoid storing plaintext

### 4. Serialization and Deserialization Risks

- RocketMQ only transmits byte arrays and does **not** perform object deserialization
- If consumers need to deserialize, they should choose secure formats (such as **JSON-Binding, Protobuf** etc.) and validate untrusted data

### 5. SDK and Version Management

- Always use the latest official stable client to obtain the latest vulnerability fixes and improvements

### 6. Log Management

- Properly keep RocketMQ-related logs (including **Broker, NameServer, Proxy, Client**, etc.) to avoid leakage of sensitive information

## Security Policy

Apache RocketMQ is a project of the Apache Software Foundation (ASF) and follows the ASF vulnerability handling process.

### Reporting a Vulnerability

To report a new vulnerability you have discovered, please follow the ASF vulnerability reporting process:
https://apache.org/security/#reporting-a-vulnerability

To help us assess and address the issue, please include the affected component(s)/version(s), reproduction steps, impact analysis, and a PoC if available.

> Please do not disclose exploitable details via public issues, mailing lists, or social media before a fix is available.