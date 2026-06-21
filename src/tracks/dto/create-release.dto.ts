import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsUrl,
} from 'class-validator';

import { ReleaseType } from '../enums/release-type.enum';
import { ReleaseStatus } from '../enums/release-status.enum';

export class CreateReleaseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ReleaseType)
  type!: ReleaseType;

  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @IsDateString()
  releaseDate: string;

  @IsEnum(ReleaseStatus)
  status!: ReleaseStatus;
}