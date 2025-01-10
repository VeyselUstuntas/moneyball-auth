import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Secure } from 'src/security/decorators/secure.decorator';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { CustomerViewModel } from './view-model/customer.vm';
import { CustomerInput } from './input-model/customer.im';
import { BaseResponse } from 'src/_base/response/Base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Get All customer' })
  @ApiResponse({
    description: 'Get All Customer',
    type: [CustomerViewModel],
    status: 200,
  })
  @Secure()
  async getCustomers(): Promise<BaseResponse<CustomerViewModel[]>> {
    const customerList: CustomerViewModel[] =
      await this.customerService.getAllCustomers();
    return new BaseResponse<CustomerViewModel[]>(
      customerList,
      ResponseMessages.SUCCESS,
      true,
    );
  }

  @Post('add-customer')
  @ApiOperation({ summary: 'Add Customer' })
  @ApiResponse({
    description: 'Generate Customer',
    type: CustomerViewModel,
    status: 201,
  })
  @Secure(UserTypes.ADMIN)
  async generateCustomer(
    @Body() customerData: CustomerInput,
  ): Promise<BaseResponse<CustomerViewModel>> {
    const generateResult =
      await this.customerService.generateCustomer(customerData);
    return new BaseResponse<CustomerViewModel>(
      generateResult,
      ResponseMessages.SUCCESS,
      true,
    );
  }

  @Get('deneme')
  @Secure(UserTypes.ADMIN)
  deneme() {
    return 'success';
  }
}
