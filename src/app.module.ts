import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ClientsModule } from './clients/clients.module.js'
import { GatewayModule } from './gateway/gateway.module.js'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			cache: true
		}),
		GatewayModule,
		ClientsModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
