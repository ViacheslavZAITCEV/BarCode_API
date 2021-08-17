import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';


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
    }),
    AuthModule
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})

export class AppModule { }
