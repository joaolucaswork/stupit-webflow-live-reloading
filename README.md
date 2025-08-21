# Simple JS Live Reload

Este repositório serve arquivos JavaScript soltos com live reload automático, ideal para desenvolvimento rápido e integração com Webflow ou outros sistemas estáticos.  
**Não há build, lint, transpile ou modularização. Apenas edite seus arquivos JS e veja o resultado no navegador instantaneamente.**

## Estrutura Recomendada

```
simple-js-live-reload/
│
├── modules/
│   ├── seu-script1.js
│   ├── seu-script2.js
│   └── ...
├── index.html
├── live-reload.js
├── package.json
└── README.md
```

## Como funciona

- Servidor local serve os arquivos JS da pasta `modules/`.
- Página HTML referencia os scripts diretamente.
- Live reload automático: ao editar qualquer JS, o navegador recarrega.
- Sem build, sem lint, sem TypeScript, sem dependências pesadas.

## Instalação

1. Clone este repositório:

   ```
   git clone <url-do-repo>
   cd simple-js-live-reload
   ```

2. Instale as dependências mínimas:

   ```
   npm install express chokidar ws
   ```

## Uso

1. Coloque seus arquivos JS soltos em `modules/`.
2. Edite `index.html` para referenciar os scripts desejados.
3. Inicie o servidor:

   ```
   node live-reload.js
   ```

4. Acesse `http://localhost:3000` no navegador.
5. Ao editar qualquer arquivo JS em `modules/`, a página recarrega automaticamente.

## Integração com Webflow

- No seu projeto Webflow, adicione uma referência ao script hospedado localmente:

  ```html
  <script src="http://localhost:3000/modules/seu-script1.js"></script>
  ```

- Use o servidor local durante o desenvolvimento para testar alterações em tempo real.

## Personalização

- Para servir outros tipos de arquivos (CSS, imagens), basta ajustar o servidor.
- Para múltiplas páginas, crie outros arquivos HTML conforme necessário.

## Objetivo

Este projeto é minimalista e serve apenas para facilitar o desenvolvimento rápido com arquivos JS soltos e live reload.  
**Não recomendado para produção.**

---

Se quiser o exemplo do `live-reload.js` ou do `index.html`, posso fornecer!
