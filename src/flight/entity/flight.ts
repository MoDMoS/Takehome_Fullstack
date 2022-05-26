import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Flight {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    fromAp: string;

    @Column({ nullable: false })
    toAp: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    departure: string;

    @Column({ nullable: false })
    arrival: string;

    @Column({ nullable: false })
    seat: number;
}
