# CS360 Hub - Customer Success Management Platform

## 🎉 Status: 100% COMPLETO

Plataforma completa de Customer Success Management com análise avançada de LTV/CAC, automações inteligentes, campanhas de marketing, integração com redes sociais, chat em tempo real e API pública.

## Project info

**Version**: 1.0.0
**Status**: Production Ready ✅

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🚀 Features

### Core Functionality
- ✅ **Customer Management** - CRUD completo, health scores, interações
- ✅ **Contract Management** - Gestão de contratos e renovações
- ✅ **NPS Management** - Coleta e análise de NPS
- ✅ **Goals & Objectives** - Definição e acompanhamento de metas
- ✅ **Reports & Analytics** - Relatórios customizáveis e dashboards

### Advanced Features (100% Implemented)
- ✅ **LTV/CAC Analysis** - 3 modelos de cálculo, cohort analysis, otimizações
- ✅ **Automations** - Engine completo com triggers e ações
- ✅ **Campaigns** - Templates de email, envio em lote, analytics
- ✅ **Social Media** - Integração com Facebook, Instagram, Twitter, LinkedIn
- ✅ **Real-time Chat** - WebSocket, typing indicators, notifications
- ✅ **Public API** - Chaves seguras, rate limiting, documentação completa

### Performance & Security
- ✅ **Virtualization** - Listas grandes otimizadas
- ✅ **Pagination** - Paginação eficiente
- ✅ **Memory Management** - Sem vazamentos de memória
- ✅ **Secure Authentication** - Retry logic, session management
- ✅ **API Security** - SHA-256 hashing, scopes, rate limiting

## 🛠 Technologies

This project is built with:

- **Frontend:** React 18.3.1 + TypeScript 5.5.3
- **Build Tool:** Vite 5.4.1
- **Styling:** Tailwind CSS 3.4.11 + shadcn/ui
- **State Management:** React Query (TanStack Query) 5.56.2
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **UI Components:** Radix UI + Lucide Icons

## ⚙️ Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Configure your environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENDGRID_API_KEY=your_sendgrid_key  # Optional
VITE_WS_URL=ws://localhost:3001  # Optional
```

## 📚 Documentation

- **API Documentation:** `docs/API.md`
- **Implementation Guide:** `IMPLEMENTATION.md`
- **Environment Variables:** `.env.example`

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy via Lovable
Simply open [Lovable](https://lovable.dev/projects/080c74de-b7d4-4a73-b566-738c37d3c8ae) and click on Share -> Publish.

### Custom Domain
Navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 📊 Project Structure

```
cs360-hub/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks (useAuth, useVirtualization, etc.)
│   ├── services/       # Business logic services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── pages/          # Page components
│   └── integrations/   # External integrations (Supabase)
├── docs/               # Documentation
├── public/             # Static assets
└── .env.example        # Environment template
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- Built with 
- UI Components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Backend by [Supabase](https://supabase.com)

---

**Made with  by the CS360 Team**
