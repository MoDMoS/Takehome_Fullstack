import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './controller/flight/flight.controller';
import { Flight } from './entity/flight';
import { FlightService } from './services/flight/flight.service';

@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
