import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserTransactionEntity,
  UserTransactionEntitySchema,
} from './entities/user-transaction.entity';
import { UserTransactionController } from './user-transaction.controller';
import { UserTransactionService } from './user-transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTransactionEntity.name, schema: UserTransactionEntitySchema },
    ]),
  ],
  controllers: [UserTransactionController],
  providers: [UserTransactionService],
})
export class UserTransactionModule {}
