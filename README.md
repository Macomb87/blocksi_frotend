# frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



docker run
--name blocksiDB
-p 5455:5432
-e POSTGRES_USER=blocksi
-e POSTGRES_PASSWORD=blocksi
-e POSTGRES_DB=blocksiDB
-d
postgres
