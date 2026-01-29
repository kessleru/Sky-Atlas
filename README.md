# Sky Atlas 🌤️

Sky Atlas é um dashboard de clima moderno e interativo, construído para fornecer informações detalhadas sobre as condições meteorológicas e a qualidade do ar em qualquer lugar do mundo.

![Sky Atlas Preview](/public/vite.svg)

## ✨ Funcionalidades

-   **Tempo em Tempo Real**: Condições atuais incluindo temperatura, sensação térmica, umidade, vento e chuva.
-   **Mapa Interativo**: Navegue pelo mapa, clique em qualquer local para obter a previsão exata daquela coordenada.
-   **Previsão Horária**: Acompanhe a evolução do clima nas próximas horas com um carrossel interativo.
-   **Previsão Diária**: Planeje sua semana com a previsão estendida.
-   **Monitoramento da Qualidade do Ar**: Painel lateral detalhado com Índice de Qualidade do Ar (IQA) e concentração de poluentes (CO, NO2, O3, etc.).
-   **Modo Escuro/Claro**: Interface adaptável para conforto visual em qualquer ambiente.
-   **Busca de Localização**: Selecione cidades predefinidas ou explore livremente pelo mapa.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido com uma stack moderna e robusta:

-   **[React](https://react.dev/)**: Biblioteca para construção da interface.
-   **[Vite](https://vitejs.dev/)**: Build tool rápida e leve.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de estilização utilitária (v4).
-   **[Shadcn UI](https://ui.shadcn.com/)**: Componentes de interface reutilizáveis e acessíveis.
-   **[TanStack Query](https://tanstack.com/query/latest)**: Gerenciamento eficiente de estado assíncrono e cache de API.
-   **[React Leaflet](https://react-leaflet.js.org/)**: Integração com mapas interativos.
-   **[OpenWeatherMap API](https://openweathermap.org/api)**: Fonte de dados meteorológicos globais.
-   **[Next Themes](https://github.com/pacocoursey/next-themes)**: Gerenciamento de temas (Dark/Light).

## 🚀 Como Rodar o Projeto

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/sky-atlas.git
    cd sky-atlas
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Configure a API Key**:
    Crie um arquivo `.env.local` na raiz do projeto e adicione sua chave da OpenWeatherMap (VITE_API_KEY).

4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

5.  **Acesse no navegador**:
    O projeto estará rodando em `http://localhost:5173`.

## 🎨 Design

O projeto foca em uma interface limpa, com hierarquia visual clara e feedback interativo. O uso de skeletons during o carregamento e transições suaves melhora a experiência do usuário.

---

Desenvolvido com 💙 por Otávio.
