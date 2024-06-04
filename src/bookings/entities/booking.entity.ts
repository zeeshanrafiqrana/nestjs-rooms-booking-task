import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; // This can be extended to a user entity if needed

  @ManyToOne(() => Room, (room) => room.bookings)
  room: Room;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column()
  status: string; // e.g., "booked" or "cancelled"
}
