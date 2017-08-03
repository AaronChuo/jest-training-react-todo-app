# Termly Project


## Local Development Setup

Update the Node.js to **7.7.1**:

```
nvm install v7.7.1
nvm use 7.7.1
```

A higher version for future releases is acceptable as well.

We are using the new [yarn](https://github.com/yarnpkg/yarn) package manager so, if you haven't installed it yet in your machine run

```
npm install -g yarn
```

and in the `/client` folder install the packages by running

```
yarn
```

or

```
yarn install
```

**NB**: Yarn can be installed from Brew too but I don't suggest it.

To run the project locally we first start the `mock-api server` (express)

```
yarn api
```

and then webpack-dev-server

```
yarn dev
```


## Production Build

To bundle for production run

```
yarn build
```

## Naming

The following are the rules to apply:

- `.js` files: **camelCase**.
- former `.jsx` files (containers, components): **PascalCase**.
- `.scss` files: **hyphenated**.
