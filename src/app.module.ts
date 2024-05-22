import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { GroceryModule } from './grocery/grocery.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, PrismaModule, GroceryModule, UserModule],
    controllers: [],
    providers: [ 
        {
        provide: APP_GUARD,
        useClass: AtGuard,
        }, 
        UserService,
    ],
})
export class AppModule {}
