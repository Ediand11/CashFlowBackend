import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionEntity.name)
    private transactionModel: Model<TransactionEntity>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return await createdTransaction.save();
  }

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionModel.find().exec();
  }

  async remove(id: string): Promise<TransactionEntity> {
    return await this.transactionModel.findByIdAndDelete(id);
  }
}
