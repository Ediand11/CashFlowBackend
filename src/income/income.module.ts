import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncomeEntity, IncomeEntitySchema } from './entities/income.entity';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IncomeEntity.name, schema: IncomeEntitySchema },
    ]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
})
export class IncomeModule {}
