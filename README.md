# 💳 Transaction Simulator (Shva Simulator)

A high-performance full-stack application designed to simulate, process, and manage credit card transactions. This project provides a complete end-to-end flow, from a secure .NET backend API to a modern, localized React dashboard.

## 🏗 Project Architecture

The workspace is structured into two main components, fully containerized for seamless deployment:

### 1. TransactionSimulatorAPI (Backend)
* **Framework:** Built with **.NET 8 Web API**.
* **Data Access:** Powered by **Entity Framework Core** with support for MS SQL Server.
* **Patterns:** Implements **Repository and Service patterns** for clean, maintainable, and testable code.
* **Features:** Specialized XML-based bulk processing for high-volume database operations and integrated JWT authentication.

### 2. TransactionSimulatorReact (Frontend)
* **Framework:** Built with **React 18**, **TypeScript**, and **Vite**.
* **Styling:** Responsive UI designed with **Tailwind CSS**.
* **Dashboard:** Provides real-time metrics including transaction counts, approval rates, and status tracking.

---

## 🐳 Docker Deployment (Recommended)

The entire application—including the API, Frontend, and Database—is fully containerized. You can spin up the whole environment with a single command without needing to install .NET, Node.js, or SQL Server locally.

### Prerequisites
* Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and running.

### 🚀 How to Run

1. **First, switch to the Docker branch :**
   ```bash
   git checkout feature/add-docker-support
2. **Build and Start the application:**
   ```bash
   docker-compose up --build
