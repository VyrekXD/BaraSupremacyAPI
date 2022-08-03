import { io } from 'socket.io-client'

const socket = io('ws://localhost:3000/api/gateway', {
	auth: {
		token: 'xd'
	}
})

socket.on('connect', () => {
	console.log('connected')
})

socket.on('error', (err) => {
	console.log(err)
})
