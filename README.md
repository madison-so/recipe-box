# madison's little recipe box 🍵

A cozy recipe box built with **React + Vite**: tabs, search and sorting, signature recipes, flavour tabs, a batch scaler (servings, volume or pan size, or tap any amount), PDF downloads, and a "paste a recipe" helper.

## Run it on your computer

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Publish on GitHub Pages

1. Create a new repository on GitHub and push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "my little recipe box"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes the site on every push. After a minute or two it's live at `https://<your-username>.github.io/<repo-name>/`.

## Where the recipes live

- The starting recipes are in **`src/data/recipes.json`**.
- Recipes added or edited on the website are saved **in that browser** (localStorage), so other visitors and devices won't see them.
- To make changes permanent for everyone: click **export recipes** in the footer, replace `src/data/recipes.json` with the downloaded file, then commit and push.
- **import recipes** loads an exported file back in, and **reset to original** goes back to the recipes in `recipes.json`.

## Project layout

```
src/
  App.jsx                 page layout, tabs, search, sorting, routing
  components/
    RecipeView.jsx        a recipe page: flavour tabs, batch scaler, ingredients, method, PDF
    RecipeForm.jsx        add / edit form with the paste-a-recipe helper
    Html.jsx, NumberField.jsx
  lib/
    text.js               quantity parsing + scaling, step formatting, sorting, categories
    art.js                the hand-drawn SVG drawings and icons
    pdf.js                PDF export (jsPDF + html2canvas)
    autofill.js           the simple recipe reader for pasted text
    storage.js            saving to the browser, import/export helpers
  data/recipes.json       your recipes
  styles.css              colours, fonts and layout
```

## Recipe format (quick reference)

Each recipe in `recipes.json` looks like:

```json
{
  "id": "lemon-vanilla-madeleines",
  "title": "Lemon Vanilla Madeleines",
  "cat": "bakes",                       // bowls | bakes | sips | syrups | bits
  "also": ["bits"],                     // optional: show in more tabs
  "signature": true,                    // optional: show in the Signature tab
  "art": "madeleine",                   // which little drawing to use
  "time": "12–15 min bake", "yield": "10–12 small madeleines", "level": "Easy",
  "blurb": "Short description…",
  "scale": { "kind": "count", "base": 11, "lo": 10, "hi": 12, "unit": "madeleines" },
  "ingredients": [["2", "Large eggs"], ["#", "Group heading"], ["100 g", "Sugar"]],
  "steps": ["# Step title", "a line under it", "- a nested point", "> a side note", "## A section"],
  "tips": ["…"],
  "notes": "…",
  "variants": [{ "name": "matcha", "dot": "#A9B173", "ingredients": [...] }]
}
```

`scale.kind` can be `count` (servings, cookies…), `volume` (`base` in mL) or `pan` (`w` × `l` inches).
