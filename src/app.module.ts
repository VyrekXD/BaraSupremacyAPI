import { Module } from '@nestjs/common'

import { ClientsModule } from './clients/clients.module.js'
import { GatewayModule } from './gateway/gateway.module.js'

@Module({
	imports: [GatewayModule, ClientsModule],
	controllers: [],
	providers: []
})
export class AppModule {}
