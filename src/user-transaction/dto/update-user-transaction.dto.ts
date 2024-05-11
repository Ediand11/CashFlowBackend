import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { ITransaction } from '../entities/user-transaction.entity';
import { CreateUserTransactionDto } from './create-user-transaction.dto';

export class UpdateUserTransactionDto extends PartialType(
  CreateUserTransactionDto,
) {
  @IsNotEmpty()
  transactions: ITransaction[];
}
