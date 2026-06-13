# Find a Friend API

API REST para adoção de pets. Organizações cadastram animais e qualquer pessoa pode buscá-los por cidade, estado e características.

Projeto desenvolvido no curso **Node.js** da [Rocketseat](https://www.rocketseat.com.br/).

## Stack

Node.js, TypeScript, Fastify, Prisma, PostgreSQL, Zod e Vitest.

## Como rodar

```bash
npm install
docker compose up -d
cp .env.example .env
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

Siga o `.env.example` para configurar as variáveis de ambiente.

Servidor em `http://localhost:3333`.

## Testes

```bash
npm run test        # unitários
npm run test:e2e    # E2E
```

## Rotas

**Organizações**

| Método | Rota             | Auth   |
|--------|------------------|--------|
| POST   | `/organizations` | —      |
| POST   | `/sessions`      | —      |
| PATCH  | `/token/refresh` | Cookie |
| GET    | `/me`            | JWT    |

**Pets**

| Método | Rota           | Auth |
|--------|----------------|------|
| POST   | `/pets`        | JWT  |
| GET    | `/pets`        | —    |
| GET    | `/pets/:petId` | —    |

`GET /pets` exige `city` e `state` na query. Filtros opcionais: `age`, `size`, `energyLevel`, `independenceLevel`, `type`.
