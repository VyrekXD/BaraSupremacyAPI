export interface Image {
	source: 'telegram' | 'discord' | string
	identifier: string
	url: string
	jumpLink: string
	type: string
	people?: string[]
}
