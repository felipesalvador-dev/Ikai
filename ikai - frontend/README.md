# Ikay — Site Web em React

Landing page oficial da Ikay, feita com React + Vite.

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- Lucide React

## Rodar localmente

```bash
npm install
npm run dev
```

Depois acesse o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Testes

```bash
npm test            # executa os testes unitários uma vez (Vitest + Testing Library)
npm run test:watch  # modo observação
```

## Documentação da API (Swagger)

O site não tem API própria; a pasta `swagger/` documenta, em OpenAPI 3, a chamada que o formulário faz à API do EmailJS.

```bash
npm run docs:api    # abre a Swagger UI em http://localhost:5174
```

## Estrutura

- `src/App.jsx` — componentes e conteúdo principal
- `src/main.jsx` — entrada do React
- `src/styles.css` — estilos
- `src/App.test.jsx` — testes unitários
- `src/test/setup.js` — configuração dos testes
- `swagger/openapi.yaml` — especificação OpenAPI da integração com o EmailJS
- `swagger/index.html` — Swagger UI
- `index.html` — documento base
