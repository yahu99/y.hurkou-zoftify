import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { USER_SERVICE_TOKEN } from '../../shared/injection-tokens';
import { IUserService } from '../../domain/interfaces/services/user.interface';
import { UserDto } from '../dtos/user/user.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRolesEnum } from '../../domain/enums/roles.enum';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_AUTH } from '../../shared/swagger-auth';

@ApiTags('Users')
@ApiBearerAuth(SWAGGER_AUTH)
@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService,
  ) {}

  @Get()
  @ApiResponse({
    type: [UserDto],
  })
  getAllUsers(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  @Roles([UserRolesEnum.USER, UserRolesEnum.ADMIN])
  @ApiResponse({
    type: UserDto,
  })
  getById(@Param('userId', ParseIntPipe) userId: number): Promise<UserDto> {
    return this.userService.getById(userId);
  }

  @Post('create')
  @Roles([UserRolesEnum.ADMIN])
  @ApiResponse({
    type: UserDto,
  })
  createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(dto);
  }

  @Put('update')
  @Roles([UserRolesEnum.ADMIN])
  @ApiResponse({
    type: UserDto,
  })
  updateUser(@Body() dto: UpdateUserDto): Promise<UserDto> {
    return this.userService.updateUser(dto);
  }

  @Delete(':id')
  @Roles([UserRolesEnum.ADMIN])
  @ApiResponse({
    type: Boolean,
  })
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
