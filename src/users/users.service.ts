import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { skip } from 'node:test';
import { PrismaService } from 'src/shared/service/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor (private readonly prisma: PrismaService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        clients: true,
        _count: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ 
      where: { id: id },
      include: { 
        clients: true,
        _count: true
      }
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id: id
      }
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    });
  }
}
