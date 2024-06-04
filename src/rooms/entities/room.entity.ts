import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  numberOfBeds: number;

  @Column('decimal')
  price: number;

  @Column('text', { array: true })
  availableDates: string[];

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
