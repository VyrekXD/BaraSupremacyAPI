import { io } from 'socket.io-client'

const socket = io('ws://localhost:3000/api/gateway', {
	auth: {
		token: 'ecc27356-a66a-4aae-820a-cb2267ea4b22'
	}
})

socket.on('connect', () => {
	console.log('connected')
})

socket.on('error', (err) => {
	console.log(err)
})
