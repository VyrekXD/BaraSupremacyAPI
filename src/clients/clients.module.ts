import { Module } from '@nestjs/common'

import { GatewayModule } from '../gateway/gateway.module.js'

import { ClientsController } from './clients.controller.js'
import { ClientsService } from './clients.service.js'

@Module({
	imports: [GatewayModule],
	controllers: [ClientsController],
	providers: [ClientsService]
})
export class ClientsModule {}
