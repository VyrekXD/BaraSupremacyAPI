import { Module } from '@nestjs/common'

import { GatewayModule } from './gateway/gateway.module.js'

@Module({
	imports: [GatewayModule],
	controllers: [],
	providers: []
})
export class AppModule {}
