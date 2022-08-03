import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, ValidateIf } from 'class-validator'

export class TelegramForceAddDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	groupId?: string
}

export class ClientForceAddDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	guildId?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	channelId?: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	@ValidateIf((o) => !!o.channelId)
	messageId?: string
}
