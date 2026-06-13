# Find a Friend API

API REST para conectar organizações de adoção de pets com pessoas que buscam um novo amigo. Desenvolvida durante o curso **Node.js** da [Rocketseat](https://www.rocketseat.com.br/).

Organizações (ONGs, abrigos, etc.) cadastram pets disponíveis para adoção. Qualquer pessoa pode buscar pets por cidade, estado e características como porte, idade e nível de energia.

## Funcionalidades

- Cadastro e autenticação de organizações (JWT + refresh token via cookie)
- Perfil da organização autenticada
- Cadastro de pets (rota protegida)
- Listagem de pets com filtros por localização e características
- Detalhes de um pet específico (inclui dados da organização responsável)
- Preenchimento automático de endereço a partir do CEP (ViaCEP)

## Tecnologias

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/) + PostgreSQL
- [Zod](https://zod.dev/) — validação de variáveis de ambiente e payloads
- [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest) — testes unitários e E2E
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — hash de senhas

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
