import { IsNotEmpty } from 'class-validator';
import { Categories } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly date: Date;
  @IsNotEmpty()
  readonly price: string;
  @IsNotEmpty()
  category: Categories;
}
