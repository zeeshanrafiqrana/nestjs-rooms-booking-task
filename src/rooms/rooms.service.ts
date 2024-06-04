import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async searchRooms(
    dateRange: string[],
    numberOfBeds: number,
  ): Promise<Room[]> {
    return this.roomsRepository
      .createQueryBuilder('room')
      .where('room.numberOfBeds = :numberOfBeds', { numberOfBeds })
      .andWhere('room.availableDates @> ARRAY[:...dateRange]::text[]', {
        dateRange,
      })
      .getMany();
  }

  async createRoom(
    name: string,
    description: string,
    numberOfBeds: number,
    price: number,
    availableDates: string[],
  ): Promise<Room> {
    const newRoom = this.roomsRepository.create({
      name,
      description,
      numberOfBeds,
      price,
      availableDates,
    });

    return this.roomsRepository.save(newRoom);
  }
}
