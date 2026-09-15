import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'Track ID to add to favorites',
    example: 1,
  })
  @IsNumber()
  trackId!: number;
}
