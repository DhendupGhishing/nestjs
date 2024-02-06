import {Injectable, UnauthorizedException,BadRequestException} from '@nestjs/common';
import { UsersService } from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {AuthDto} from "./auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username:string,
        password:string
    ):Promise<any>{
        console.log(username)
        const signInData = plainToClass(AuthDto, { username, password });
        const errors = await validate(signInData);
        if (errors.length > 0) {
            throw new BadRequestException(errors.toString());
        }
        const user= await this.userService.findOne(username);
        if(user?.password!=password){
            throw new UnauthorizedException();
        }
       const payload={sub:user.userId,username:user.username};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
