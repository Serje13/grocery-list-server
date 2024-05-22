import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GroceryType, GroceryTypeCombined } from './types'

@Injectable()
export class GroceryService {
    constructor(
        private prisma: PrismaService,
    ) {}
    async create(gr: CreateGroceryDto): Promise<GroceryType> {
        const grocery = await this.prisma.grocery
        .create({
            data: {
                title: gr.title,
                status:gr.status,
                priority: gr.priority,
                userId: gr.userId,
            },
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ForbiddenException('Something went wrong when grocery has been created');
            }
            throw error;
        });

        return grocery;
    }

    async findAll(id: number, filter: number | undefined): Promise<GroceryTypeCombined[] | null> {
        const groceries = await this.prisma.grocery
        .findMany({
            where: {
                userId: id,
                status: filter !== undefined ? filter : undefined
            },
            include: {
                changes: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
                
            },
            orderBy: [
                {
                    priority: 'asc',
                },
                {
                    title: 'asc',
                },
            ]
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ForbiddenException('Something went wrong when groceries have been found');
            }
            throw error;
        });
        return groceries;
    }

    async findOne(id: number) : Promise<GroceryTypeCombined | null > {
        const grocery = await this.prisma.grocery
        .findUnique({
            where: {
                id: id,
            },
            include: {
                changes: {
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
                
            },
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ForbiddenException('Something went wrong when grocery has been found');
            }
            throw error;
        });
        if (!grocery) {
            throw new ForbiddenException('Grocery not found');
        }
        return grocery;
    }

    async update(id: number, updateGroceryDto: UpdateGroceryDto) : Promise<GroceryTypeCombined | null> {
        const grocery = await this.prisma.grocery
        .update({
            where: {
                id: id
            },
            data: updateGroceryDto  
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ForbiddenException('Something went wrong when grocery has been updated');
            }
            throw error;
        });
        const updates = await this.prisma.update
        .create({
            data:  {
                groceryId: grocery.id,
                createdAt: new Date()
            } 
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ForbiddenException('Something went wrong when changes have been created');
            }
            throw error;
        });
        if (!grocery || !updates) {
            throw new ForbiddenException('Data has not been updated');
        }
        return {...grocery, changes: [updates]};
    }

    async remove(id: number) : Promise<GroceryType | null> {
        const grocery = await this.prisma.grocery
        .delete({
            where: {
                id: id
            },
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ForbiddenException('Something went wrong when grocery has been deleted');
            }
            throw error;
        });
        return grocery;
    }
}
