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
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  create(
    @Request() request: ExpressRequest,
    @Body() createIncomeDto: CreateIncomeDto,
  ) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const userEmail = request.user.email;
    const incomeData = { userEmail, income: createIncomeDto.income };
    return this.incomeService.create(incomeData);
  }

  @Get()
  findOne(@Request() request: ExpressRequest) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.incomeService.findOne(request.user.email);
  }

  @Patch(':id')
  update(
    @Request() request: ExpressRequest,
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.incomeService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  remove(@Request() request: ExpressRequest, @Param('id') id: string) {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.incomeService.remove(id);
  }
}
