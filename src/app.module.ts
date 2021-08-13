import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose'


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('CONNECTION_BD'),
        ...{ useNewUrlParser: true, useUnifiedTopology: true }
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
