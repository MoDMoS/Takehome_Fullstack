import { IsNumber, IsString } from "class-validator";

export class CustomerDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

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
    adults: number;

    @IsNumber()
    children: number;

    @IsNumber()
    infants: number;
}

export class UpdateCustomerDto {
    departure: string;
    arrival: string;
}