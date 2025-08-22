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

### Desenvolvimento Local

1. Coloque seus arquivos JS soltos em `webflow-modules-txt/modules/`.
2. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   # ou
   node live-reload.js
   ```

3. O servidor irá:
   - Fazer build automático dos módulos
   - Servir o arquivo buildado em `http://localhost:3000/dist/index.js`
   - Recarregar automaticamente quando você editar arquivos

### Integração com Webflow

**Para usar o código buildado no Webflow:**

1. No seu projeto Webflow, adicione no `<head>` da página:

   ```html
   <script src="http://localhost:3000/dist/index.js"></script>
   ```

2. **Para live reload no Webflow** (opcional), adicione também:

   ```html
   <script>
     const ws = new WebSocket('ws://localhost:3000');
     ws.onmessage = (msg) => {
       if (msg.data === 'reload') location.reload();
     };
   </script>
   ```

3. Agora quando você editar qualquer arquivo em `webflow-modules-txt/modules/`, o Webflow irá recarregar automaticamente!

### Build para Produção

```bash
npm run build
```

O arquivo final estará em `dist/index.js` pronto para ser hospedado.

## Personalização

- Para servir outros tipos de arquivos (CSS, imagens), basta ajustar o servidor.
- Para múltiplas páginas, crie outros arquivos HTML conforme necessário.

## Objetivo

Este projeto é minimalista e serve apenas para facilitar o desenvolvimento rápido com arquivos JS soltos e live reload.  
**Não recomendado para produção.**

---

Se quiser o exemplo do `live-reload.js` ou do `index.html`, posso fornecer!
