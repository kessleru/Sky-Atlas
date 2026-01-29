<div align="center">
  <img src="./src/assets/demo/Sky-Atlas.svg" alt="Sky Atlas" />
</div>

![React](https://img.shields.io/badge/React-19.0.0--rc.1-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-06B6D4?style=flat-square&logo=tailwindcss)
![Typescript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)

Sky Atlas é um dashboard de clima moderno e interativo, construído para fornecer informações detalhadas sobre as condições meteorológicas e a qualidade do ar em qualquer lugar do mundo. Desenvolvido com uma stack moderna focada em performance e UX.

> ⚠️ **Aviso Importante:** Este projeto requer uma chave de API da **OpenWeatherMap** para buscar dados de clima e geocodificação. A versão gratuita da API possui limites de requisições.

## 🌐 Demo

🔗 **Live:** [Acessar aplicação](https://sky-atlas-demo.vercel.app/)

## ✨ Funcionalidades

### 🌦️ Clima em Tempo Real

- Condições atuais detalhadas: temperatura, sensação térmica, umidade e vento
- Ícones dinâmicos baseados no clima atual
- Atualizações via OpenWeatherMap API OneCall 3.0

### 🗺️ Mapa Interativo

- Integração com Leaflet para navegação global
- Clique no mapa para ver o clima de qualquer local
- Layers personalizáveis e responsivos

### 💨 Qualidade do Ar

- Monitoramento preciso de poluentes (CO, NO2, O3, PM2.5)
- Índice de Qualidade do Ar (IQA) com feedback visual
- Dados cruciais para saúde e planejamento

### 📅 Previsão Detalhada

- **Carrossel Horário**: Previsão para as próximas 48 horas
- **Previsão Diária**: Panorama para os próximos 7 dias
- Gráficos e visualizações intuitivas

### 🔍 Busca Inteligente

- Pesquisa de cidades e locais com geocodificação
- Sugestões rápidas e histórico
- Suporte a coordenadas geográficas

### 🌗 Interface Adaptável

- Design responsivo (Mobile, Tablet, Desktop)
- Tema Escuro/Claro automático (via `next-themes`)
- Skeletons para carregamento suave

## 🛠️ Tecnologias

### Core

- **[React 19 RC](https://react.dev/)** - Biblioteca para construção de interfaces
- **[Vite 7](https://vitejs.dev/)** - Build tool e dev server ultrarrápido
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Engine de estilização moderna
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado

### Bibliotecas e UI

- **[TanStack Query](https://tanstack.com/query/latest)** - Gerenciamento de estado assíncrono e cache
- **[React Leaflet](https://react-leaflet.js.org/)** - Mapas interativos com Leaflet
- **[Shadcn UI](https://ui.shadcn.com/)** - Componentes de interface reutilizáveis (Radix UI)
- **[Zod](https://zod.dev/)** - Validação de esquemas e tipos (API Responses)
- **[Lucide React](https://lucide.dev/)** - Ícones vetoriais modernos

### Ferramentas de Qualidade

- **ESLint** - Linting de código
- **Prettier** - Formatação consistente

## 🏗️ Arquitetura

```
src/
├── api.tsx                    # Funções de interação com API (fetch + zod)
├── App.tsx                    # Componente raiz e layout
├── main.tsx                   # Ponto de entrada
├── index.css                  # Estilos globais e Tailwind config
├── components/                # Componentes da UI
│   ├── cards/                 # Cartões de informação (Clima, Previsão...)
│   ├── dropdowns/             # Elementos de seleção
│   ├── map/                   # Componentes do React Leaflet
│   ├── side-panel/            # Painel lateral de detalhes
│   ├── skeletons/             # Loading states
│   └── ui/                    # Componentes base (Shadcn/Radix)
├── lib/                       # Utilitários (cn, formatações)
├── schemas/                   # Schemas Zod para validação
│   ├── weatherSchema.ts       # Tipagem de resposta de Clima
│   ├── geocodeSchema.tsx      # Tipagem de Geocodificação
│   └── airPollutionSchema.tsx # Tipagem de Poluição
└── assets/                    # Imagens e ícones estáticos
```

## 🔌 API e Dados

A aplicação consome a API **OpenWeatherMap** (OneCall 3.0):

### Schemas Zod (`src/schemas`)

Garantimos a integridade dos dados recebidos da API utilizando Zod para parsing e validação em tempo de execução.

- `OneCallSchema`: Valida a resposta completa de clima (current, hourly, daily).
- `GeocodeSchema`: Valida os dados de geolocalização da busca.
- `AirPollutionSchema`: Valida os dados de qualidade do ar.

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Chave de API da OpenWeatherMap

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sky-atlas.git

# Entre no diretório
cd sky-atlas

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_KEY=sua_chave_api_aqui
```

### Scripts

| Comando           | Descrição                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Gera a build de produção             |
| `npm run lint`    | Executa a verificação de código      |

---

<div align="center">
    
[![GitHub](https://img.shields.io/badge/GitHub-kessleru-181717?logo=github)](https://github.com/kessleru)

</div>
