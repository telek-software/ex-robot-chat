# 🤖 Robo-Chat

Robo-Chat is a modular chat platform combining a **real-time backend (NestJS + Kafka)** and multiple **frontend clients (Vite + React + Next.js)**.  
It is designed to demonstrate a scalable micro-frontend and micro-service setup suitable for production or research use cases involving chatbots, agents, or message-driven systems.

---

## 🏗️ Project Structure
```bash
robo-chat/
├── main-api/           # Core backend (NestJS + Kafka)
├── web-admin/          # Admin dashboard (Vite + React + TypeScript)
├── web-app/            # End-user chat web app (Vite + React)
└── web-portal/         # Marketing / Portal website (Next.js)
```
Each subproject is independent but can communicate through shared services (Kafka, REST, or WebSocket).

---

## ⚙️ Tech Stack Overview

### 🧠 **Backend: `main-api`**
- **NestJS (TypeScript)** – Modular, dependency-injection based backend
- **Kafka** – Asynchronous event streaming between services
- **Docker Compose** – Service orchestration (Kafka, Zookeeper, API)
- **Yarn Workspaces** – Shared dependency management
- **Node 20+**

### 💻 **Frontend Clients**
| App | Framework | Purpose |
|-----|------------|----------|
| `web-admin` | React + Vite | Admin panel (manage bots, users, analytics) |
| `web-app` | React + Vite | Main user chat interface |
| `web-portal` | Next.js | Public website / entrypoint with SSR and i18n |

---

## 🧩 Backend Structure (`main-api`)
```bash
main-api/
├── apps/                  # Application modules (auth, chat, user, etc.)
├── libs/                  # Shared business logic
├── scripts/               # Utility & deployment scripts
├── Dockerfile.main-api    # Dockerfile for API service
├── Dockerfile.reader      # Kafka consumer
├── Dockerfile.writer      # Kafka producer
├── docker-compose.yml     # Local orchestration
├── package.json
└── tsconfig.json
```
```bash
### Environment Variables
Create a `.env` file inside `main-api/`:

PORT=3000
KAFKA_BROKER=localhost:9092
DATABASE_URL=postgres://user:password@localhost:5432/robochat
JWT_SECRET=your-secret-key
```
---

## 🧠 Frontend Apps Overview

### `web-admin` & `web-app`
Vite-based React apps using TypeScript and modular structure.
```bash
cd web-admin
yarn install
yarn dev
```
or
```bash
cd web-app
yarn install
yarn dev
```
Both apps rely on environment variables from `.env` files:
```bash
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```
### `web-portal`
Next.js marketing site with i18n, SSR, and modern routing.
```bash
cd web-portal
yarn install
yarn dev
```
---

## 🐳 Run with Docker

### 1. Start backend + Kafka
```bash
cd main-api
docker-compose up -d
```
### 2. Build frontend containers
Each frontend has its own Dockerfile or can be built manually:
```bash
cd web-admin
docker build -t robo-admin .
```
### 3. Run full stack
You can extend `docker-compose.yml` to include all frontends if desired.

---

## 🧪 Development Tips

- Use **Yarn workspaces** to manage dependencies consistently.
- Backend scripts are located in `main-api/scripts`.
- To lint or format:
  yarn lint
  yarn format
- Testing (backend):
  cd main-api
  yarn test

---

## 🧱 Architecture Overview

             ┌────────────────┐
             │  web-portal    │
             └──────┬─────────┘
                    │
                    │ (HTTP)
                    ▼
          ┌──────────────────────┐
          │      main-api        │
          │ (NestJS + Kafka)     │
          └──────┬──────┬────────┘
                 │      │
       (REST/WS) │      │ (Kafka)
                 ▼      ▼
         web-admin   web-app

---

## 📜 License

This project is distributed under the MIT License.  
See [LICENSE.md](./LICENSE.md) for details.
