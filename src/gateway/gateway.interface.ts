export interface Image {
	source: 'telegram' | 'discord' | string
	identifier: string
	urls: string[]
	jumpLink: string
	type: string
	people?: string[]
}
