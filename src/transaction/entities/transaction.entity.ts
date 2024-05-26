import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Categories {
  Food = 'Food',
  Salary = 'Salary',
  Transportation = 'Transportation',
  Housing = 'Housing',
  Utilities = 'Utilities',
  Entertainment = 'Entertainment',
  Healthcare = 'Healthcare',
  Insurance = 'Insurance',
  Investments = 'Investments',
  Savings = 'Savings',
  Debt = 'Debt',
  Education = 'Education',
  Gifts = 'Gifts',
  Charity = 'Charity',
  Travel = 'Travel',
  PersonalCare = 'Personal Care',
  Miscellaneous = 'Miscellaneous',
}
@Schema()
export class TransactionEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true, enum: Object.values(Categories) })
  category: Categories;
}

export const TransactionEntitySchema =
  SchemaFactory.createForClass(TransactionEntity);
