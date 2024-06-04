import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async bookRoom(
    userId: string,
    roomId: number,
    startDate: string,
    endDate: string,
  ): Promise<string> {
    const room = await this.roomsRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const newBooking = this.bookingsRepository.create({
      userId,
      room,
      startDate,
      endDate,
      status: 'booked',
    });

    await this.bookingsRepository.save(newBooking);

    return newBooking.id;
  }

  async searchBookings(dateRange: string[]): Promise<Booking[]> {
    return this.bookingsRepository.createQueryBuilder('booking')
      .where(
        'booking.startDate <= :endDate AND booking.endDate >= :startDate',
        {
        startDate: dateRange[0],
        endDate: dateRange[1],
      })
      .getMany();
  }
}
