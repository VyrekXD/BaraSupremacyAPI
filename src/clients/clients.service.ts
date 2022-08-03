import { Injectable } from '@nestjs/common'

import { GatewayService } from '../gateway/gateway.service.js'

import { ClientForceAddDto } from './clients.dto.js'

@Injectable()
export class ClientsService {
	constructor(private gatewayService: GatewayService) {}

	telegramForceAdd(groupId?: string) {
		this.gatewayService.server.emit('forceAddTelegram', groupId)
	}

	clientForceAdd(body: ClientForceAddDto) {
		this.gatewayService.server.emit('forceAddClient', body)
	}
}
