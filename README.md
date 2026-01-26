
# AccessHub  
> Central de gestão de acessos, portas, servidores e softwares para múltiplos clientes.  
> Inspirado no conceito do **meuguia.dev**, porém com foco **operacional, técnico e auditável**.

---

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-24.x-orange)
![React](https://img.shields.io/badge/react-18.x-61dafb)

---

## 📌 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Modelo de Dados](#modelo-de-dados)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Estratégia de Testes](#estratégia-de-testes)
- [Roadmap](#roadmap)
- [Como Executar](#como-executar)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 🔍 Visão Geral
O **AccessHub** é um sistema centralizado para gestão técnica de acessos, servidores, softwares e auditoria, voltado para equipes de TI, MSPs e consultorias.

**Objetivos:**
- Reduzir erros operacionais
- Aumentar segurança
- Centralizar conhecimento técnico
- Facilitar auditoria

---

## 🏗️ Arquitetura
### High Level

┌────────────────────────────┐
│        Frontend Web        │
│  React + TS + Tailwind     │
│  (Vite / PWA Ready)        │
└─────────────▲──────────────┘
│ HTTPS + JWT
┌─────────────┴──────────────┐
│        Backend API         │
│  Node.js + Express         │
│  JWT + Supabase Auth       │
└─────────────▲──────────────┘
│ SQL + RPC
┌─────────────┴──────────────┐
│     Supabase (Postgres)    │
│ Auth | DB | Storage | Logs │
└────────────────────────────┘

---

## ✅ Funcionalidades
- Autenticação (Supabase Auth + JWT)
- Gestão de Clientes, Servidores, Portas, Softwares
- Links de Acesso (Portal, API, Monitoramento)
- Agenda integrada (Google Calendar)
- ToDo List técnica
- Controle de Horas com relatórios

---

## 🛠️ Stack Tecnológica
**Frontend:** React, TypeScript, Vite, TailwindCSS  
**Backend:** Node.js 24, Express, JWT, Supabase  
**Banco:** Supabase (Postgres), AES-256 para credenciais  

---

## 🗄️ Modelo de Dados
Principais tabelas: `users`, `clients`, `servers`, `ports`, `softwares`, `links`, `tasks`, `time_entries`

---

## 🔐 Requisitos Não Funcionais
- Segurança: JWT obrigatório
- LGPD: Logs e consentimento
- Performance: Indexação SQL
- Auditoria: Logs imutáveis

---

## 🧪 Estratégia de Testes
- Unitários: Vitest
- Integração: Supertest
- Segurança: OWASP ZAP
- Frontend: Testing Library
- Lint: Biome

---

## 🚀 Roadmap
**Fase 1:** Auth, Clientes, Servidores  
**Fase 2:** Portas, Softwares, Links  
**Fase 3:** Agenda, Horas, Relatórios  

---

## ▶️ Como Executar
### Pré-requisitos
- Node.js 18+
- Supabase configurado
- Vercel CLI (opcional para deploy)

### Instalação
```bash
git clone https://github.com/seu-repo/accesshub.git
cd accesshub
npm install
```

---

### Rodar em Desenvolvimento
```bash
npm run dev``Mostrar mais linhas
```

---

### 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: git checkout -b feature/nova-funcionalidade
3. Commit suas alterações: git commit -m 'Adiciona nova funcionalidade'
4. Push: git push origin feature/nova-funcionalidade
5. Abra um Pull Request

---

### 📄 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

---

## ✅ **Exemplo seguro de `.env`**

```env
# Supabase
SUPABASE_URL=https://<sua-instancia>.supabase.co
SUPABASE_ANON_KEY=<chave-anon>
SUPABASE_SERVICE_ROLE_KEY=<chave-service-role>

# JWT
JWT_SECRET=<chave-secreta-super-segura>
JWT_EXPIRATION=1h

# Vercel
VERCEL_TOKEN=<token-vercel>

# Segurança
AES_SECRET_KEY=<chave-aes-256>
NODE_ENV=development

# Google Calendar
GOOGLE_CLIENT_ID=<client-id>
GOOGLE_CLIENT_SECRET=<client-secret>
GOOGLE_REDIRECT_URI=<redirect-uri>
```
