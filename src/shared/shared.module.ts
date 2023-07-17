import { Module } from '@nestjs/common';
import { PrismaService } from './service/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class SharedModule {}
