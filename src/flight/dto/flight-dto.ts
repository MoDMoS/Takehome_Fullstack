import { IsNumber, IsString } from "class-validator";

export class FlightDto {
    @IsNumber()
    id: number;

    @IsString()
    fromAp: string;

    @IsString()
    toAp: string;

    @IsString()
    type: string;

    @IsString()
    departure: string;

    @IsString()
    arrival: string;

    @IsNumber()
    seat: number;
}
