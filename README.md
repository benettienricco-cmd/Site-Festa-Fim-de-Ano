# The Last Dance · RSVP

Site de confirmação de presença da festa de fim de ano Biosphera — 18.12.2026 · 14h00 às 00h00 · Lote SP.

![preview](preview.jpg)

## Como funciona
- `index.html` — o site (publicado pelo GitHub Pages). Qualquer pessoa com o link consegue responder, sem login.
- `Code.gs` — recebe as respostas e grava numa planilha do Google Sheets.

## Configurar (uma vez, ~5 min)
1. **Planilha:** crie em sheets.new → Extensões › Apps Script → cole `Code.gs` → salve.
2. **Implantar:** Implantar › Nova implantação › App da Web · Executar como: Eu · Quem pode acessar: Qualquer pessoa. Autorize e copie o URL que termina em `/exec`.
3. **Ligar o site:** o URL do script já está em `index.html` (`SCRIPT_URL`).
4. **Publicar:** no GitHub, Settings › Pages › Source: *Deploy from a branch* · Branch: `main` / `(root)` → Save.
   O link fica em `https://benettienricco-cmd.github.io/Site-Festa-Fim-de-Ano/`.

As respostas caem na aba **RSVP** da planilha (data, nome, empresa, cargo, presença). Se a pessoa alterar a resposta no mesmo aparelho, a linha é atualizada.
