# Ikai – TCC

## Sistema Web (`ikai - frontend/`)

React 19 + Vite 6 landing page. Comandos (rodar dentro de `ikai - frontend`):

- `npm run dev` – servidor de desenvolvimento
- `npm run build` – build de produção em `dist/`
- `npm test` – testes unitários (Vitest + Testing Library, ambiente jsdom; configuração em `vite.config.js` e `src/test/setup.js`)

- `npm run docs:api` – Swagger UI da integração com o EmailJS (`swagger/openapi.yaml`, porta 5174)

Verificação antes de concluir alterações: `npm test` e `npm run build`. Ao alterar a especificação, validar com `npx @redocly/cli@1.34.0 lint swagger/openapi.yaml`.

Observações:
- Arquivos de `public/` são servidos na raiz do site; referencie-os como `/arquivo` ou `${import.meta.env.BASE_URL}arquivo`, nunca `./public/...`.
- O EmailJS é mockado nos testes (`vi.mock("@emailjs/browser")`); não envie formulários reais em testes.
- O relatório técnico do site fica em `docs/Relatorio_Tecnico_Ikai_Sistema_Web.(docx|pdf)`.
