import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';

type AuthenticatedUser = {
  id: number;
};

@ApiTags('favorites')
@Controller('favorites')
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  @Roles(Role.Fan)
  @ApiOperation({ summary: 'Add a track to favorites' })
  @ApiResponse({ status: 201, description: 'Track added to favorites' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 403, description: 'Only fans can add favorites' })
  createFavorite(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateFavoriteDto,
  ) {
    return this.favoriteService.createFavorite(user.id, dto.trackId);
  }

  @Get()
  @Roles(Role.Fan)
  @ApiOperation({ summary: 'Get user favorite tracks' })
  @ApiResponse({ status: 200, description: 'List of user favorite tracks' })
  @ApiResponse({ status: 403, description: 'Only fans can view favorites' })
  getMyFavorites(@CurrentUser() user: AuthenticatedUser) {
    return this.favoriteService.getMyFavorites(user.id);
  }

  @Delete('tracks/:trackId')
  @Roles(Role.Fan)
  @ApiOperation({ summary: 'Remove a track from favorites' })
  @ApiParam({
    name: 'trackId',
    type: 'number',
    description: 'Track ID to remove',
  })
  @ApiResponse({ status: 200, description: 'Track removed from favorites' })
  @ApiResponse({ status: 404, description: 'Track not found in favorites' })
  @ApiResponse({ status: 403, description: 'Only fans can remove favorites' })
  removeFavorite(
    @CurrentUser() user: AuthenticatedUser,
    @Param('trackId', ParseIntPipe) track: number,
  ) {
    return this.favoriteService.removeFavorite(user.id, track);
  }

  @Get('favorite/check/:trackId')
  @Roles(Role.Fan)
  @ApiOperation({ summary: 'Check if a track is in favorites' })
  @ApiParam({
    name: 'trackId',
    type: 'number',
    description: 'Track ID to check',
  })
  @ApiResponse({ status: 200, description: 'Favorite status returned' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  checkFavorite(
    @CurrentUser() user: AuthenticatedUser,
    @Param('trackId', ParseIntPipe) track: number,
  ) {
    return this.favoriteService.checkFavorite(user.id, track);
  }
}
