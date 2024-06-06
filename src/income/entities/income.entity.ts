import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum IncomeCategories {
  Salary = 'Salary',
  BusinessIncome = 'Business Income',
  PassiveIncome = 'Passive Income (dividends, interest)',
  SocialBenefits = 'Social Benefits (pensions, allowances)',
}

export interface IIncome {
  name: string;
  date: Date;
  amount: string;
  category: IncomeCategories;
}

const IncomeSchema = new MongooseSchema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: String, required: true },
  category: {
    type: String,
    enum: Object.values(IncomeCategories),
    required: true,
  },
});

@Schema()
export class IncomeEntity {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: [IncomeSchema], required: true })
  income: IIncome[];
}

export const IncomeEntitySchema = SchemaFactory.createForClass(IncomeEntity);
