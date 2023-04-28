import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { databaseConfiguration } from './common/constants';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfiguration), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
