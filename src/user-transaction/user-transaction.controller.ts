import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ExpressRequest } from 'src/users/middleware/auth.middleware';
import { CreateUserTransactionDto } from './dto/create-user-transaction.dto';
import { UpdateUserTransactionDto } from './dto/update-user-transaction.dto';
import { UserTransactionService } from './user-transaction.service';

@Controller('user-transaction')
export class UserTransactionController {
  constructor(
    private readonly userTransactionService: UserTransactionService,
  ) {}

  @Post()
  create(
    @Request() request: ExpressRequest,
    @Body() createUserTransactionDto: CreateUserTransactionDto,
  ) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const userEmail = request.user.email;
    return this.userTransactionService.create(
      userEmail,
      createUserTransactionDto.transactions,
    );
  }

  @Get()
  findOne(@Request() request: ExpressRequest) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userTransactionService.findOne(request.user.email);
  }
  //ToDo:Test Patch and Delete
  @Patch(':id')
  update(
    @Request() request: ExpressRequest,
    @Param('id') id: string,
    @Body() updateUserTransactionDto: UpdateUserTransactionDto,
  ) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userTransactionService.update(id, updateUserTransactionDto);
  }

  @Delete(':id')
  remove(@Request() request: ExpressRequest, @Param('id') id: string) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.userTransactionService.remove(id);
  }
}
