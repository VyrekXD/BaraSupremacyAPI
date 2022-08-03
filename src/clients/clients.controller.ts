import { Body, Controller, Post, Request, UnauthorizedException } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { config } from 'dotenv'

import { ClientForceAddDto, TelegramForceAddDto } from './clients.dto.js'

import { ClientsService } from './clients.service.js'

config()

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
	constructor(private clientsService: ClientsService) {}

	@ApiOkResponse({ status: 200 })
	@Post('/telegram/force-add')
	async postTelegramForceAdd(@Request() req: Request, @Body() body: TelegramForceAddDto) {
		if (!req.headers.get('authorization')) throw new UnauthorizedException('Token not provided')
		if (req.headers.get('authorization') !== process.env.TOKEN) throw new UnauthorizedException('Token not valid')

		this.clientsService.telegramForceAdd(body.groupId)
	}

	@ApiOkResponse({ status: 200 })
	@Post('/client/force-add')
	async postClientForceAdd(@Request() req: Request, @Body() body: ClientForceAddDto) {
		if (!req.headers.get('authorization')) throw new UnauthorizedException('Token not provided')
		if (req.headers.get('authorization') !== process.env.TOKEN) throw new UnauthorizedException('Token not valid')

		this.clientsService.clientForceAdd(body)
	}
}
