import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { DeleteResult } from 'typeorm';
import { NotFoundException } from '../errors/not-found.exception';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  protectedRoute() {
    return 'ACESSIVEL';
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const user = (await this.usersService.remove(id)) as DeleteResult;

    if (user.affected === 0) {
      throw new NotFoundException();
    }

    return res.status(200).send({ message: 'User has been deleted.' });
  }
}
