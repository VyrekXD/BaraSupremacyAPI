import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module.js'
;(async () => {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
	app.setGlobalPrefix('/api')

	if (process.env.NODE_ENV === 'development') {
		const config = new DocumentBuilder().setTitle('Documentation').build()
		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('/api', app, document)
	}

	app.useGlobalPipes(new ValidationPipe())
	await app.listen(3000, '::')
})()
