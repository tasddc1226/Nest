import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {

	@ApiProperty({
		example: '39282312',
		description: 'id',
	})
	id: string;

	@ApiProperty({
		example: 'example@gmail.com',
		description: 'email',
	})
	email: string;

	@ApiProperty({
		example: 'amanda',
		description: 'name',
	})
	name: string;
}