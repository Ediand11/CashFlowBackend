import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomeEntity } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(IncomeEntity.name)
    private readonly incomeModel: Model<IncomeEntity>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto): Promise<IncomeEntity> {
    let userIncome = await this.incomeModel
      .findOne({ userEmail: createIncomeDto.userEmail })
      .exec();
    if (!userIncome) {
      userIncome = new this.incomeModel({
        userEmail: createIncomeDto.userEmail,
        income: [],
      });
    }

    if (createIncomeDto.income && Array.isArray(createIncomeDto.income)) {
      userIncome.income.push(...createIncomeDto.income);
    } else {
      console.log(createIncomeDto.income);
      throw new Error('Invalid newIncomes provided');
    }

    return userIncome.save();
  }

  async findOne(userEmail: string): Promise<IncomeEntity> {
    return await this.incomeModel.findOne({ userEmail }).exec();
  }

  async update(
    id: string,
    updateIncomeDto: UpdateIncomeDto,
  ): Promise<IncomeEntity> {
    return await this.incomeModel
      .findByIdAndUpdate(id, updateIncomeDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<IncomeEntity> {
    return await this.incomeModel.findByIdAndDelete(id).exec();
  }
}
