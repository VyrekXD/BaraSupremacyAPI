import { config as dotenv } from 'dotenv'

dotenv()

export const config = {
	token: process.env.TOKEN
}
