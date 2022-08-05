import { config as dotenv } from 'dotenv'

dotenv({ path: '../.env' })

export const config = {
	token: process.env.TOKEN
}
