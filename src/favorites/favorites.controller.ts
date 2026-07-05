import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  @Roles(Role.Fan)
  createFavorite(@CurrentUser() user, @Body() dto: CreateFavoriteDto) {
    return this.favoriteService.createFavorite(user.id, dto.trackId);
  }

  @Get()
  @Roles(Role.Fan)
  getMyFavorites(@CurrentUser() user,) {
    return this.favoriteService.getMyFavorites(user.id,);
   }

  @Delete('tracks/:trackId')
  @Roles(Role.Fan)
       removeFavorite(@CurrentUser() user, @Param('trackId', ParseIntPipe) trackId: number,
   ) {
    return this.favoriteService.removeFavorite(
        user.id,
        trackId,
    );
  }

  @Get('favorite/check/:trackId')
  @Roles(Role.Fan)
  checkFavorite(@CurrentUser() user, @Param('trackId', ParseIntPipe) trackId: number) {
    return this.favoriteService.checkFavorite(user.id, trackId);
  }
}
