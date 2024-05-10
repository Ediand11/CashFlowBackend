import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ExpressRequest } from 'src/users/middleware/auth.middleware';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @Request() request: ExpressRequest,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll(@Request() request: ExpressRequest) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.transactionService.findAll();
  }

  @Delete(':id')
  remove(@Request() request: ExpressRequest, @Param('id') id: string) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.transactionService.remove(id);
  }
}
