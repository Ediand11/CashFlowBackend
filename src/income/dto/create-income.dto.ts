import { IsNotEmpty } from 'class-validator';
import { IIncome } from '../entities/income.entity';

export class CreateIncomeDto {
  @IsNotEmpty()
  userEmail: string;

  @IsNotEmpty()
  income: IIncome[];
}
