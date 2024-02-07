import {Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {jwtConstants} from "./auth.constant";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {UserRepository} from "../user/user.repository";

@Module({
  imports: [
      UserModule,
  JwtModule.register({
        global:true,
        secret:jwtConstants.secret,
        signOptions:{expiresIn: '60s'}})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
