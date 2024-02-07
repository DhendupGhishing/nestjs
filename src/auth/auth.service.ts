import {Injectable, UnauthorizedException,BadRequestException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {AuthDto} from "./auth.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username:string,
        password:string
    ):Promise<any>{
        const signInData = plainToClass(AuthDto, { username, password });
        const errors = await validate(signInData);
        if (errors.length > 0) {
            throw new BadRequestException(errors.toString());
        }
        const user= await this.userService.findUser(username);
        if(user?.password!=password){
            throw new UnauthorizedException();
        }
       const payload={user};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
