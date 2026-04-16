# TriAL — Frontend

Frontend. Aplicação SPA com autenticação JWT, consumindo a API Laravel.

## Tecnologias

- **Vue 3** — Composition API com `<script setup>`
- **Quasar v2** — UI framework responsivo
- **Pinia** — Gerenciamento de estado global
- **Vue Router v4** — Navegação com guards de autenticação
- **Axios** — Comunicação HTTP com a API

## Estrutura do projeto

```
src/
├── boot/
│   └── axios.js            # Instância Axios com interceptors (JWT + erros)
├── components/
│   └── InputField.vue      # Componente reutilizável de input com validação
├── layouts/
│   ├── AuthLayout.vue      # Layout para telas públicas (login, cadastro)
│   └── MainLayout.vue      # Layout para telas protegidas (header + logout)
├── pages/
│   ├── LoginPage.vue       # Tela de login
│   ├── RegisterPage.vue    # Tela de cadastro
│   ├── HomePage.vue        # Tela home (protegida, exibe dados do usuário)
│   └── ErrorNotFound.vue   # Página 404
├── router/
│   ├── index.js            # Configuração do router + guards
│   └── routes.js           # Definição das rotas
└── stores/
    ├── index.js            # Instância do Pinia
    └── auth.js             # Store de autenticação (token, usuário, login, logout)
```

## Requisitos

- Node.js 22+
- npm ou pnpm

## Instalação

1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd frontend
```

2. Instalar dependências

```bash
npm install
```

3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` se necessário:

```dotenv
VITE_API_URL=http://localhost:8000/api
```

4. Iniciar em modo de desenvolvimento

```bash
npx quasar dev
```

A aplicação abrirá automaticamente no navegador.

## Build para produção

```bash
npx quasar build
```

Os arquivos serão gerados em `dist/spa/`.

## Funcionalidades

### Autenticação JWT

- Login e cadastro integrados com a API (`POST /login`, `POST /register`)
- Token JWT armazenado no `localStorage` e injetado automaticamente via interceptor Axios
- Logout limpa sessão e redireciona para login

### Guards de rota

- Rotas protegidas redirecionam para `/login` quando não autenticado
- Usuário autenticado não acessa `/login` e `/cadastro`

### Telas

| Rota        | Tela     | Descrição                                                                                                |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `/login`    | Login    | Campos de e-mail e senha                                                                                 |
| `/cadastro` | Cadastro | Campos: nome, e-mail, senha, telefone, data de nascimento                                                |
| `/`         | Home     | Exibe dados do usuário (nome, status, data de expiração, telefone, data de nascimento) e botão de logout |

### Tratamento de erros

- Erros da API são exibidos automaticamente via `Quasar Notify` (interceptor de resposta do Axios)

### Componente reutilizável

- `InputField.vue` — encapsula `q-input` com label, ícone, validação e suporte a máscara. Utilizado nas telas de login e cadastro.

## API esperada

A aplicação consome a API Laravel com as seguintes rotas:

| Método | Rota            | Autenticação | Descrição                    |
| ------ | --------------- | :----------: | ---------------------------- |
| POST   | `/api/register` |     Não      | Cadastro de usuário          |
| POST   | `/api/login`    |     Não      | Login                        |
| GET    | `/api/me`       |     Sim      | Dados do usuário autenticado |
| POST   | `/api/logout`   |     Sim      | Logout                       |

Base URL configurada via variável de ambiente `VITE_API_URL`.
