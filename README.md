## Description

Transaction commission calculation service

## Running the app

1. add `.env` file to the root folder

```
APP_PORT=3001
EXCHANGE_RATE_API_URL=https://api.exchangerate.host
EXCHANGE_RATE_API_CACHE_MAX_RESULTS=30
TZ=UTC
DB_HOST=localhost
DB_PORT=5432
DB_NAME=local
DB_USER=user
DB_PASSWORD=password
```

2. Run `docker-compose up --build`
3. Api: http://localhost:3001/api/
4. Request tracing (Zipkin): http://localhost:9411/zipkin/

## Test

```bash
# node >= 16.10 is required
# install packages
$ yarn

# unit test
$ yarn jest currency-conversion.service.spec.ts

# integration test
$ yarn jest app.module.spec.ts
```

## TO DO

1. Add integration tests with running database
2. Add monitoring (`prom-client`, `Prometheus`, `Grafana`)

## Stay in touch

- linkedin - [Andrei Mashko](http://www.linkedin.com/in/andrei-mashko)
- email - mashko.an@gmail.com
