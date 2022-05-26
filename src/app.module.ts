import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entity/customer';
import { Flight } from './flight/entity/flight';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    CustomerModule,
    FlightModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.db/final.db',
      entities: [Customer, Flight],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
