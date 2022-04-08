export interface Config {
  APP_PORT: number;
  EXCHANGE_RATE_API_URL: string;
  EXCHANGE_RATE_API_CACHE_MAX_RESULTS: number;
  DB_CONFIG: {
    client: string;
    connection: {
      host: string;
      port: number;
      database: string;
      user: string;
      password: string;
    };
  };
  ZIPKIN_URL: string;
}
