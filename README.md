# asr web form

## local
install dependencies
```bash
yarn
# or
npm install
```
start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


## container

build:
```
docker build -t asr-web-form .
```

run:
```
docker run --name asr-web-form -p 8080:8080 asr-web-form
```




