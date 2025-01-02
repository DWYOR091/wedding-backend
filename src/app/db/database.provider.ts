import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'rifqi123',
        database: process.env.DB_NAME,
        entities: [__dirname + '/../entities/*.entity.{ts,js}'],
        synchronize: true, //false ketika production
        // extra: {
        //   connectionLimit: 100,
        // },
      });
      return dataSource
        .initialize()
        .then(() => {
          console.log('Database connected');
          return dataSource;
        })
        .catch((err) => {
          console.error('Database connection error:', err);
          throw err;
        });
    },
  },
];
