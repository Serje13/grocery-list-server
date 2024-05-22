import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';


@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
