// https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  private getBooleanValue(key: string, throwOnMissing = true): boolean {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    if (value === 'true' || value === 'TRUE') {
      return true;
    }
    return false;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = process.env.NODE_ENV;
    return mode === 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('DB_TYPE') as any,

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // synchronize: this.getBooleanValue('DB_SYNC'),
      synchronize:true,

      //   migrationsTableName: 'migration',

      //   migrations: ['src/migration/*.ts'],

      //   cli: {
      //     migrationsDir: 'src/migration',
      //   },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  // for application
  'PORT',
  
  // for Database
  'DB_TYPE',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'DB_SYNC',

  // JWT
  'JWT_EXPIRE_IN',
  'JWT_SECRET',
]);

export { configService };
