import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { BaseResponse } from 'src/_base/response/Base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { UserDetails } from 'src/users/view-models/user-details.vm';
import { Secure } from 'src/security/decorators/secure.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get All User' })
  @Secure()
  async getAllUser(): Promise<BaseResponse<UserDetails[]>> {
    const userList: UserDetails[] = await this.userService.getAllUser();

    return new BaseResponse<UserDetails[]>(
      userList,
      ResponseMessages.SUCCESS,
      true,
    );
  }
}
