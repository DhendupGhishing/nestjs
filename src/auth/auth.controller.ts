import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards,Request, Get} from '@nestjs/common';
import { AuthService} from "./auth.service";
import {AuthGuard} from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<any, any>){
        const parsedQuery = JSON.parse(signInDto.query);
        const username = parsedQuery.username;
        const password = parsedQuery.password;
        return this.authService.signIn(username, password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user)
        return req.user.username;
    }
}
