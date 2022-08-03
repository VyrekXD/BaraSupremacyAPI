import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ClientForceAddDto, TelegramForceAddDto } from './clients.dto.js'

import { ClientsService } from './clients.service.js'

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
	constructor(private clientsService: ClientsService) {}

	@ApiOkResponse({ status: 200 })
	@Post('/telegram/force-add')
	async postTelegramForceAdd(@Body() body: TelegramForceAddDto) {
		this.clientsService.telegramForceAdd(body.groupId)
	}

	@ApiOkResponse({ status: 200 })
	@Post('/client/force-add')
	async postClientForceAdd(@Body() body: ClientForceAddDto) {
		this.clientsService.clientForceAdd(body)
	}
}
