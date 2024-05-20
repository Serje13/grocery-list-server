import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroceryService {
  constructor(
    private prisma: PrismaService,
  ) {}
  create(createGroceryDto: CreateGroceryDto) {
    return 'This action adds a new grocery';
  }

  async findAll(id: number) {
    const groceries = await this.prisma.grocery
    .findMany({
        where: {
          userId: id,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Something went wrong');
          }
        }
        throw error;
      });


    return groceries;
  }

  findOne(id: number) {
    return `This action returns a #${id} grocery`;
  }

  update(id: number, updateGroceryDto: UpdateGroceryDto) {
    return `This action updates a #${id} grocery`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocery`;
  }
}
