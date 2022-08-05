import { Body, Controller, Post, Request, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { ClientForceAddDto, TelegramForceAddDto } from './clients.dto.js'

import { ClientsService } from './clients.service.js'

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
	constructor(private clientsService: ClientsService, private configService: ConfigService) {}

	@ApiOkResponse({ status: 200 })
	@Post('/telegram/force-add')
	async postTelegramForceAdd(@Request() req: Request, @Body() body: TelegramForceAddDto) {
		if (!req.headers.get('authorization')) throw new UnauthorizedException('Token not provided')
		if (req.headers.get('authorization') !== this.configService.get<string>('TOKEN'))
			throw new UnauthorizedException('Token not valid')

		this.clientsService.telegramForceAdd(body.groupId)
	}

	@ApiOkResponse({ status: 200 })
	@Post('/client/force-add')
	async postClientForceAdd(@Request() req: Request, @Body() body: ClientForceAddDto) {
		if (!req.headers.get('authorization')) throw new UnauthorizedException('Token not provided')
		if (req.headers.get('authorization') !== this.configService.get<string>('TOKEN'))
			throw new UnauthorizedException('Token not valid')

		this.clientsService.clientForceAdd(body)
	}
}
