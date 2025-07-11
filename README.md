# CV

My CV, built in Vue, because why not

[See it online](https://clemdee.github.io/cv/)

## Usual stuff

```sh
pnpm install
pnpm dev
# build (without type checking)
pnpm build-only
```

## Usage

Some files are not tracked to preserve sensitive info, but have sample versions for the public live demo:
- `src/stores/config/config.sample.ts` -> `config.ts`
- `src/stores/data/data.sample.ts` -> `data.ts`

To generate pdf from it, save the page as a pdf from the browser (adjust margins and stuff).
