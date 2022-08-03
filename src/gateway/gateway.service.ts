import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { config } from 'dotenv'
import { Logger } from '@nestjs/common'

interface Image {
	source: 'telegram' | 'discord' | string
	identifier: string
	urls: string[]
	jumpLink: string
	type: string
	people?: string[]
}

config()

@WebSocketGateway({
	transports: ['websocket'],
	namespace: 'ws',
	cors: {
		origin: '*'
	}
})
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
	private readonly logger = new Logger(GatewayService.name)

	@WebSocketServer()
	server: Server

	sockets: number = 0

	afterInit() {
		this.logger.log('Gateway initialized.')
	}

	handleDisconnect() {
		this.sockets--

		this.logger.log(
			`Socket disconnected. ${this.sockets ? `${this.sockets} still connected.` : 'No more sockets connected.'}`
		)
	}

	handleConnection(@ConnectedSocket() socket: Socket) {
		const token = socket.handshake.auth.token

		if (!token) {
			socket.emit('error', new Error('Auth: No token provided.'))
			socket.disconnect(true)
			return
		} else if (token !== process.env.TOKEN) {
			socket.emit('error', new Error('Auth: Invalid token.'))
			socket.disconnect(true)

			this.logger.warn('Socket tried to connect with invalid token.')
			return
		}

		this.sockets++

		this.logger.log(`Socket connected. ${this.sockets} connected.`)
	}

	@SubscribeMessage('addImage')
	async addImages(@ConnectedSocket() socket: Socket, @MessageBody() data: Image) {
		this.server.emit('addImage', data)
	}
}
