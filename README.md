## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Things to check before running

Open `src/api/client.ts` and check `BASE_URL` matches the port your .NET API is
actually running on (check the address bar when Swagger opens, e.g.
`https://localhost:7100`):

```ts
const BASE_URL = "https://localhost:61457/api";
```


## Pages

| Route | Page | Notes |
|---|---|---|
| `/login` | Login | Demo account: `demo` / `Demo123!` |
| `/` | Popular Movies | Grid sorted by popularity |
| `/search` | Search | Search by title/genre/director |
| `/movies/:id` | Movie Detail | Full detail + favorite toggle |
| `/favorites` | Favorites | Lists movies you've favorited |



## Structure

```
src/
  api/client.ts        - axios instance + typed API calls, JWT interceptor
  context/AuthContext.tsx - login/logout state, shared via React context
  components/          - Navbar, MovieCard, ProtectedRoute
  pages/                - one file per route
  types/index.ts        - TypeScript interfaces mirroring the backend DTOs
