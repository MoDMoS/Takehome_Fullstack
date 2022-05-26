import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'class-validator';
import { FlightDto } from 'src/flight/dto/flight-dto';
import { Flight } from 'src/flight/entity/flight';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
    public flight: FlightDto[] = [];

    constructor(
        @InjectRepository(Flight)
        private flightRepo: Repository<Flight>,
    ) {}

    async addFlight(flight: FlightDto){
        const result = `SELECT * FROM flight WHERE fromAp='` + flight.fromAp + `' AND toAp='` + flight.toAp + `' AND type='` + flight.type + `' AND departure='` + flight.departure + `' AND arrival='` + flight.arrival + `'`
        const sql = await this.flightRepo.query(result)
        if(isEmpty(JSON.stringify(sql[0]))){
            return this.flightRepo.save(flight);
        }else{
            return "Have flight"
        }
    }

    loadAll(): Promise<Flight[]>{
        return this.flightRepo.find()
    }
    
    async loadName(departure: string): Promise<FlightDto> {
        return await this.flightRepo.findOne({ departure: departure});
    }
}
