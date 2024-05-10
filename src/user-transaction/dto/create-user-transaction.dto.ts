import { IsNotEmpty } from 'class-validator';
import { ITransaction } from '../entities/user-transaction.entity';

export class CreateUserTransactionDto {
  @IsNotEmpty()
  transactions: ITransaction[];
}
