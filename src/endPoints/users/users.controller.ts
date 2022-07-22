import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UUID } from '../../settings';
import { MESSAGES } from '../../messages';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.getOne(id);

    if (!user) throw new NotFoundException(MESSAGES.userNotFound);

    return user;
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: UUID,
      }),
    )
    id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    const user = await this.usersService.update(id, dto);

    if (!user) throw new NotFoundException(MESSAGES.userNotFound);

    return user;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: UUID,
      }),
    )
    id: string,
  ) {
    const result = await this.usersService.remove(id);

    if (!result) throw new NotFoundException(MESSAGES.userNotFound);

    return;
  }
}
