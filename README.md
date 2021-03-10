- docker-compose
- eslint
- stylelint
- prettier
- typescript
- snowpack
- svelte
- tailwindcss

# clone

```console
git clone --depth=1 --branch=main git@github.com:himanushi/docker-eslint-stylelint-prettier-snowpack-svelte-typescript-tailwindcss.git dir-name
rm -rf ./dir-name/.git
```

# docker build

```console
cd dir-name
docker-compose build
```

# docker dive

```console
docker-compose up -d
docker-compose exec app bash
```

# svelte server

```console
npm run start
```

# vscode recommendations

```jsonc
{
  "recommendations": [
    // svelte
    "svelte.svelte-vscode",
    // eslint
    "dbaeumer.vscode-eslint",
    // stylelint
    "stylelint.vscode-stylelint",
    // prettier
    "esbenp.prettier-vscode",
    // fix with vscode prettier → eslint → stylelint
    "rohit-gohri.format-code-action",
    // tailwindCSS classname autocomplete
    "bradlc.vscode-tailwindcss",
    // vscode explorer icons
    "vscode-icons-team.vscode-icons"
  ]
}
```
