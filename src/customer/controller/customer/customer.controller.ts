import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerDto, UpdateCustomerDto } from 'src/customer/dto/customer/customer-dto';
import { CustomerService } from 'src/customer/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  addCustomer(@Body() customer: CustomerDto){
    return this.customerService.addCustomer(customer);
  }

  @Get()
  loadCustomer() {
    // return "Load customer"
    return this.customerService.loadAll();
  }

  @Get(':name')
  async findName(@Param('name') name: string): Promise<CustomerDto> {
    return await this.customerService.loadName(name);
  }

  @Put(':name')
  async updateCustomer(
    @Param('name') name: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ){
    const customer = await this.customerService.loadName(name);
    customer.departure = updateCustomerDto.departure;
    customer.arrival = updateCustomerDto.arrival;
    return await this.customerService.editCustomer(customer);
  }

  @Delete(':name')
  async deleteCustomer(@Param('name') name: string): Promise<any> {
    return await this.customerService.remove(name);
  }

}
