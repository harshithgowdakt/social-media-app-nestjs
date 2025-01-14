import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { FollowerModule } from './follower/follower.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostModule,
    LikeModule,
    CommentModule,
    FollowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
