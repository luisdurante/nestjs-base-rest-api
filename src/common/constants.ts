import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../modules/users/entities/user.entity';

export const databaseConfiguration: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  synchronize: true,
};

export const jwtConfiguration = {
  secret: process.env.JWT_SECRET,
  ttl: process.env.JWT_TTL,
};
