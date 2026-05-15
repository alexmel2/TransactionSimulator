# Shva Transaction Simulator - Frontend (React) 🚀

This is the responsive, high-performance Frontend Client for the **Shva Transaction Simulator**. Built using React, TypeScript, and Tailwind CSS, this client application communicates with a secure .NET 8 Web API to simulate, validate, and monitor global banking transactions based on regional availability and business hours.

## 🛠️ Tech Stack & Libraries

- **Framework:** React 18 (Functional Components with Hooks)
- **Language:** TypeScript (Strict Typing & Interfaces)
- **Styling:** Tailwind CSS (Modern, Utility-First Utility Suite)
- **HTTP Client:** Axios (With Interceptors for Auth Token delivery)
- **State Management:** React Component State (`useState`, `useEffect`)

---

## ✨ Implemented Client Features

- **Secure Session Management:** Automated application guarding (`AuthPage.tsx`). Restricts full dashboard access until a valid session is verified.
- **Dynamic KPI Dashboard:** Live calculation of transactional analytics (`Dashboard.tsx`) including total volume counters, approved/rejected counters, and automatic success rate percentages.
- **Interactive Transaction Form:** Quick regional validation testing against current banking hours.
- **Animated Notification Modals:** Replaced basic browser alerts with premium, animated slide-in popup modals that change design dynamically based on transaction approval states (`Approved` / `Rejected` / `Error`).
- **Persistence Storage:** Automatic tracking of active JWTs inside `localStorage` to preserve user sessions during hard browser refreshes (F5).

---

## 📂 Project Structure (Key Directories)

```text
src/
├── components/
│   ├── Auth/
│   │   └── AuthPage.tsx         # Stateful login/registration toggle form
│   ├── Dashboard/
│   │   └── Dashboard.tsx        # Presentational analytical KPI cards & breakdown bar
│   └── Transaction/
│       ├── TransactionForm.tsx  # Region selector and time simulation trigger
│       └── TransactionList.tsx  # Paginated datagrid of previous operations
├── models/
│   └── transaction.model.ts     # TypeScript schemas for strong code typing
├── services/
│   ├── authService.ts           # Handles server-side POST requests (Login/Register)
│   └── transactionService.ts    # Communicates with transactional endpoints using Axios
├── App.tsx                      # Smart main root orchestrator (Session Guard)
└── main.tsx                     # React DOM initialization node