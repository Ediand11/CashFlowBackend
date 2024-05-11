import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ExpressRequest } from './middleware/auth.middleware';
import { UserResponseType } from './types/userResponse.type';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.userService.loginUser(loginDto);
    res.cookie('accessToken', this.userService.generateJwt(user), {
      expires: new Date(new Date().getTime() + 60 * 1000 * 60), // 1 hour auth
      sameSite: 'strict',
      httpOnly: true,
    });
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      console.log(request);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.buildUserResponse(request.user);
  }
}
