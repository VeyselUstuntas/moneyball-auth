import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { DatabaseService } from 'src/database/database.service';
import { CustomerViewModel } from './view-model/customer.vm';
import { CustomerInput } from './input-model/customer.im';

@Injectable()
export class CustomerService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllCustomers(): Promise<CustomerViewModel[]> {
    try {
      const result: CustomerViewModel[] =
        await this.databaseService.customer.findMany();
      console.log('customerr ', result);
      return result;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(ResponseMessages.CUSTOMERS_NOT_FOUND);
    }
  }

  async generateCustomer(
    customerData: CustomerInput,
  ): Promise<CustomerViewModel> {
    try {
      const result = await this.databaseService.customer.create({
        data: {
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address,
          userId: customerData.userId,
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(ResponseMessages.CUSTOMER_NOT_CREATED);
    }
  }
}
