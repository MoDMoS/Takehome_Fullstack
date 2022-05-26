import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class  Customer{
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

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

    @Column()
    adults: number;

    @Column()
    children: number;

    @Column()
    infants: number;
}
