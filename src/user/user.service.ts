import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserType, GetUserType } from './types/index';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) {}
    async create(createUserDto: AuthDto, hash: string): Promise<CreateUserType> {
        const user = await this.prisma.user
        .create({
            data: {
                email: createUserDto.email,
                hash,
            },
        })
        .catch((error) => {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials incorrect');
                }
            }
            throw error;
        });
        return user;
    }

    async findOne(getUserDto: AuthDto) : Promise<CreateUserType | null>{
        const user = await this.prisma.user.findUnique({
            where: {
                email: getUserDto.email,
            },
        })
        
        return user;
    }
    async findOneById(userId: number) : Promise<GetUserType | null>{
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        
        return user;
    }

    async update(userId: number, hash: string) : Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }

    async updateManyItems(userId: number) : Promise<void> {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        });
    }
}
