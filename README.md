# Gravitel Test Project

## Run

Install dependencies

```bash
npm i
```

Build
```bash
npm run build
```

Start
```bash
npm run preview
```

## Run inside docker container

Build image

```bash
docker build -t gravitel-test-project .
```

Start container

```bash
docker run -d -p 8000:80 gravitel-test-project
```

## Run in development mode

Install dependencies

```bash
npm i
```

Start with hot-reload

```bash
npm run dev
```