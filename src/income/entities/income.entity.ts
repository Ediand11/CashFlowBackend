import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Categories } from 'src/transaction/entities/transaction.entity';

export interface IIncome {
  name: string;
  date: Date;
  amount: string;
  category: Categories;
}

const IncomeSchema = new MongooseSchema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: String, required: true },
  category: { type: String, enum: Object.values(Categories), required: true },
});

@Schema()
export class IncomeEntity {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ type: [IncomeSchema], required: true })
  income: IIncome[];
}

export const IncomeEntitySchema = SchemaFactory.createForClass(IncomeEntity);
