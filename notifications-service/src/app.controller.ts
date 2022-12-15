import { Body, Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { PrismaService } from './prisma.service';
import {randomUUID} from 'node:crypto';
import { brotliDecompressSync } from 'node:zlib';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(){
    return this.prisma.notification.findMany();
  }

  @Post()
   async create(@Body() body: CreateNotificationBody){
    const{ recipientId, content, category } = body
    
    await this.prisma.notification.create({
      data:{
        id: randomUUID(),
        content,
        category,
        recipientId,
     },
    });
  }
}

