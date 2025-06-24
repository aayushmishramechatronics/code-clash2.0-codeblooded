# 🧠 CodeBlooded – Code Clash 2.0 Project

A smart, modular web application built using **Next.js** and **Tailwind CSS**, focusing on real-time resource tracking and analytics, enhanced with chatbot support and modular views for different aspects like inventory, weather, and suppliers.

---

## 📁 Project Structure

```
.
├── app/                      # Main application views and API routes
│   ├── api/chat/            # Chatbot API endpoint
│   ├── inventory/           # Inventory tracking page
│   ├── purchases/           # Purchase records and UI
│   ├── suppliers/           # Supplier management
│   ├── weather/             # Weather dashboard
│   └── layout.tsx          # Global layout and theme
│
├── components/              # Reusable UI components
│   ├── add-purchase-modal.tsx
│   ├── app-sidebar.tsx
│   ├── chatbot-modal.tsx
│   ├── inventory-tracker.tsx
│   ├── project-spending-chart.tsx
│   └── radial-project-chart.tsx
│
├── public/                  # Static files (if any)
├── styles/                  # Tailwind and global CSS
├── .env.local               # Environment variables
├── package.json             # Project metadata and scripts
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.mjs          # Next.js config
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd codeblooded
```

### 2. Install dependencies

This project uses **PNPM** (recommended). If not installed, do:

```bash
npm install -g pnpm
```

Then:

```bash
pnpm install
```

### 3. Configure environment

Create a `.env.local` file based on the template:

```bash
cp .env.local.example .env.local
```

Update values as required.

### 4. Run development server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PNPM](https://pnpm.io/)
- [ShadCN/UI](https://ui.shadcn.com/) (assumed from structure)
- Chatbot API (custom endpoint in `api/chat/`)

---

## 📦 Features

- 📊 Real-time dashboard with radial and bar charts
- 🛒 Inventory and purchase tracking
- 🤖 Chatbot support
- ☁️ Weather data integration
- 🔔 Notification system
- Modular component-based design

---

## 📄 License

MIT License. See `LICENSE` file (if available) for more details.

---

## 🤝 Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first.

---

## ✨ Authors

- Team CodeBlooded – Code Clash 2.0
