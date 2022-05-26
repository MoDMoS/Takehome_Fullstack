import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FlightDto } from 'src/flight/dto/flight-dto';
import { FlightService } from 'src/flight/services/flight/flight.service';

@Controller('flight')
export class FlightController {
    constructor(private flightService: FlightService) {}

    @Post()
    addFlight(@Body() flight: FlightDto){
        // return "Add Flight"
        return this.flightService.addFlight(flight)
    }

    @Get()
    loadFlight(){
        return this.flightService.loadAll()
    }
}
