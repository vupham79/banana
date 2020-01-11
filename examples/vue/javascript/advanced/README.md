# advanced

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Troubleshooting

If you couldn't compile vue demo under WSL in Windows with error like
 
```
These dependencies were not found: ...
```
 
then try to use this code for `vue.config.js` file. 

```js
module.exports = {
    publicPath: '',
    css: {
        sourceMap: true
    },
    transpileDependencies: [
        'bryntum-gantt'
    ],
    chainWebpack: (config) => {
        config.resolve.symlinks(false);
    }
};
```
