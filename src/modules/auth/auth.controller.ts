import { Controller, Get, Post, Res, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import { RequestHasUserDTO } from 'src/utils/request-has-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/constants';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth("token")
@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService) {}

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Body() body: LoginDto, @Request() req: RequestHasUserDTO & Request, @Res() res: Response){
        const user = req.user;
        const payload = { id: user.id, sub: body.email };
        const token = await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.expired
        });
        return res.json({token})
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    async getProfile(@Request() req: RequestHasUserDTO & Request, @Res() res: Response){
        const user = req.user;
        console.log(user);
        return res.json({
            user
        });
    }
}
