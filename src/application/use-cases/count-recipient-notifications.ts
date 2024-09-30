import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface CountRecipientNotificationsUseCaseRequest {
  recipientId: string;
}

interface CountRecipientNotificationsUseCaseResponse {
  count: number
}

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(
    private notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: CountRecipientNotificationsUseCaseRequest): Promise<CountRecipientNotificationsUseCaseResponse> {
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

    return {
      count,
    }
  }
}