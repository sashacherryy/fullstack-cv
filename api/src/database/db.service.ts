import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    public db: ReturnType<typeof drizzle<typeof schema>>;

    constructor(private readonly configService: ConfigService) {}

    async onModuleInit() {
        const databaseUrl = this.configService.get<string>('DATABASE_URL');

        if(!databaseUrl) {
            throw new Error('Database URL is not defined.');
        }

        this.pool = new Pool({
            connectionString: databaseUrl
            , max: 5
            , ssl: {
                rejectUnauthorized: true
            }
        })

        this.db = drizzle(this.pool, {
            schema,
        });
    }

    async onModuleDestroy() {
        await this.pool.end();
    }

}