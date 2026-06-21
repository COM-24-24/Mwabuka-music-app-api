import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  title: string;

  @IsUrl()
  audioUrl: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  trackNumber: number;

  @IsOptional()
  @IsString()
  lyrics?: string;

  @IsNumber()
  releaseId: number;
}