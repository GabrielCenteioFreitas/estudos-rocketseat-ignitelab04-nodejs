import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Notification } from "@application/entities/notification";

interface GetRecipientNotificationsUseCaseRequest {
  recipientId: string;
}

interface GetRecipientNotificationsUseCaseResponse {
  notifications: Notification[]
}

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(
    private notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: GetRecipientNotificationsUseCaseRequest): Promise<GetRecipientNotificationsUseCaseResponse> {
    const { recipientId } = request

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

    return {
      notifications,
    }
  }
}