import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { UpdateUserTransactionDto } from './dto/update-user-transaction.dto';
import {
  ITransaction,
  UserTransactionEntity,
} from './entities/user-transaction.entity';

@Injectable()
export class UserTransactionService {
  constructor(
    @InjectModel(UserTransactionEntity.name)
    private readonly userTransactionModel: Model<UserTransactionEntity>,
  ) {}

  async create(
    userEmail: string,
    newTransactions: Partial<TransactionEntity>[],
  ): Promise<UserTransactionEntity> {
    let userTransaction = await this.userTransactionModel
      .findOne({ userEmail })
      .exec();

    if (!userTransaction) {
      userTransaction = new this.userTransactionModel({
        userEmail,
        transaction: [],
      });
    }

    // Check if newTransactions is defined and an array
    if (newTransactions && Array.isArray(newTransactions)) {
      const convertedTransactions: ITransaction[] = newTransactions.map(
        (transaction) => ({
          name: transaction.name,
          date: transaction.date,
          price: transaction.price,
          category: transaction.category,
        }),
      );

      userTransaction.transaction.push(...convertedTransactions);
    } else {
      // Handle the case where newTransactions is not defined or not an array
      console.log(newTransactions);
      throw new Error('Invalid newTransactions provided');
    }

    return userTransaction.save();
  }

  async findOne(userEmail: string): Promise<UserTransactionEntity> {
    return await this.userTransactionModel.findOne({ userEmail }).exec();
  }

  async update(
    id: string,
    updateUserTransactionDto: UpdateUserTransactionDto,
  ): Promise<UserTransactionEntity> {
    return await this.userTransactionModel
      .findByIdAndUpdate(id, updateUserTransactionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserTransactionEntity> {
    return await this.userTransactionModel.findByIdAndDelete(id).exec();
  }
}
