import { DataSource } from "typeorm";

export const databaseProviders = [{
    provide: 'DATA_SOURCE',
    useFactory: async () => {
        const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [
                __dirname + '/../entities/*.entity{.ts,.js}',
            ],
            synchronize: true, //false ketika production 
        });

        return dataSource.initialize().then(() => {
            console.log('database connected');
            return dataSource
        }).catch((err) => {
            console.log('Ini Error:' + err)
        });;
    }
}]