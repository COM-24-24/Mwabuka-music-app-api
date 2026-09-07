import { IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Track title',
    example: 'Song Title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Audio file URL',
    example: 'https://example.com/audio.mp3',
  })
  @IsUrl()
  audioUrl: string;

  @ApiProperty({
    description: 'Track duration in seconds',
    example: 240,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Track number in the release',
    example: 1,
  })
  @IsNumber()
  trackNumber: number;

  @ApiPropertyOptional({
    description: 'Track lyrics',
    example: 'Lyrics text here...',
  })
  @IsOptional()
  @IsString()
  lyrics?: string;

  @ApiProperty({
    description: 'Release ID that this track belongs to',
    example: 1,
  })
  @IsNumber()
  releaseId: number;
}
