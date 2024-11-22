import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';
import { ServicesModule } from './services/services.module';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,ServicesModule,BidsModule
  ],
})
export class AppModule {}