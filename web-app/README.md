# Web-App

## Description

The Web-App is the main interface App for the clients. They can manage their chatbot with several configurations.

## Development

```bash
git clone git@gitlab.com:chappygo/web-app.git
cd web-app
yarn
cp .env-example .env
```

### Start the App

```
yarn dev
```

### Build the App

```
yarn build
```

### Test the App

```
yarn test
```

---

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
