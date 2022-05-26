import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { CustomerDto } from 'src/customer/dto/customer/customer-dto';
import { Customer } from 'src/customer/entity/customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  public customers: CustomerDto[] = [];

  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  async addCustomer(customer: CustomerDto) {
    const result = `SELECT seat FROM flight WHERE fromAp='` + customer.fromAp + `' AND toAp='` + customer.toAp + `' AND type='` + customer.type + `'`;
    const sql1 = await this.customerRepo.query(result);
    if (!isEmpty(JSON.stringify(sql1[0]))) {
      const sum1 = JSON.parse(JSON.stringify(sql1[0]));
      const result2 = `SELECT name FROM customer WHERE name='` + customer.name + `'`;
      const sql2 = await this.customerRepo.query(result2);
      if (isEmpty(JSON.stringify(sql2[0]))) {
        this.customerRepo.save(customer);
        const sum2 = customer.adults + customer.children + customer.infants;
        const result3 = `UPDATE flight SET seat='` + (Number(sum1.seat) - Number(sum2)) + `' WHERE fromAp='` + customer.fromAp + `' AND toAp='` + customer.toAp + `' AND type='` + customer.type + `'`;
        const sql3 = await this.customerRepo.query(result3);
        return (
          'Total seats: ' + Number(sum1.seat) + '\nReserved seats: ' + Number(sum2) + '\nEmpty seats: ' + (Number(sum1.seat) - Number(sum2))
        );
      } else {
        return 'You have flight';
      }
    } else {
      return "Don't have flight";
    }
  }

  async editCustomer(customer: CustomerDto) {
    return this.customerRepo.save(customer);
  }

  loadAll(): Promise<CustomerDto[]> {
    return this.customerRepo.find();
  }

  async loadName(name: string): Promise<CustomerDto> {
    return await this.customerRepo.findOne({ name: name });
  }

  async remove(name: string): Promise<any> {
    const result = `SELECT fromAp, toAp, type, adults + children + infants AS Total FROM customer WHERE name='` + name + `'`;
    const sql = await this.customerRepo.query(result);
    const sum = JSON.parse(JSON.stringify(sql[0]));
    const result2 = `SELECT seat FROM flight WHERE fromAp='` + sum.fromAp + `' AND toAp='` + sum.toAp + `' AND type='` + sum.type + `'`;
    const sql2 = await this.customerRepo.query(result2);
    const sum2 = JSON.parse(JSON.stringify(sql2[0]));
    const result3 = `UPDATE flight SET seat='` + (Number(sum2.seat) + Number(sum.Total)) + `' WHERE fromAp='` + sum.fromAp + `' AND toAp='` + sum.toAp + `' AND type='` + sum.type + `'`;
    const sql3 = await this.customerRepo.query(result3);
    await this.customerRepo.delete({ name: name });
    return (
      'Returned seat: ' + Number(sum.Total) + '\nReserved seats: ' + Number(sum2.seat) + '\nTotal Empty seats: ' + (Number(sum.Total) + Number(sum2.seat))
    );
    //return sql[0]
  }
}
