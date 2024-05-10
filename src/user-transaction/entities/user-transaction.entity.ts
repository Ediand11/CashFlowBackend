import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Categories,
  TransactionEntitySchema,
} from 'src/transaction/entities/transaction.entity';

export interface ITransaction {
  name: string;
  date: Date;
  price: string;
  category: Categories;
}

@Schema()
export class UserTransactionEntity {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: [TransactionEntitySchema], required: true })
  transaction: ITransaction[];
}

export const UserTransactionEntitySchema = SchemaFactory.createForClass(
  UserTransactionEntity,
);
