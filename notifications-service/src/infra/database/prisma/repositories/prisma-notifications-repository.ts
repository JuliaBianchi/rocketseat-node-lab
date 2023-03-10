import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "src/application/entities/notification";
import { NotificationsRepository } from "../../../../application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {

    constructor(private prismaService: PrismaService){}

    async create(notification: Notification): Promise<void> {
        await this.prismaService.notification.create({
            data: {
                id: notification.id,
                content: notification.content.value,
                category: notification.category,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt,

            }
        })
    }
}