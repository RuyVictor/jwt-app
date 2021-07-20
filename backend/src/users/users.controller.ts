import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    return this.usersService.changePassword(id, changeUserPasswordDto);
  }
}
