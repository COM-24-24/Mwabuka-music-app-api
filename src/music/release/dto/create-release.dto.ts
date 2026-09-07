import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ReleaseType } from '../../enums/release-type.enum';
import { ReleaseStatus } from '../../enums/release-status.enum';

export class CreateReleaseDto {
  @ApiProperty({
    description: 'Release title',
    example: 'Album Name',
  })
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    description: 'Release description',
    example: 'This is a great album',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Type of release',
    enum: ReleaseType,
    example: ReleaseType.ALBUM,
  })
  @IsEnum(ReleaseType)
  type!: ReleaseType;

  @ApiPropertyOptional({
    description: 'Cover image URL',
    example: 'https://example.com/cover.jpg',
  })
  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @ApiProperty({
    description: 'Release date',
    example: '2024-01-01',
  })
  @IsDateString()
  releaseDate!: string;

  @ApiProperty({
    description: 'Release status',
    enum: ReleaseStatus,
    example: ReleaseStatus.PUBLISHED,
  })
  @IsEnum(ReleaseStatus)
  status!: ReleaseStatus;
}
