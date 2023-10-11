import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    // Initialize the Prisma client
    await this.$connect();
  }

  async onModuleDestroy() {
    // Gracefully disconnect the Prisma client when the application is shutting down
    await this.$disconnect();
  }
}
