import { Controller, Get, Query, BadRequestException, Post, Body } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('search')
  async searchRooms(
    @Query('dateRange') dateRange: string,
    @Query('numberOfBeds') numberOfBeds: string,
  ): Promise<Room[]> {
    if (!dateRange || !numberOfBeds) {
      throw new BadRequestException('dateRange and numberOfBeds are required');
    }

    const parsedDateRange = dateRange.split(',');
    if (parsedDateRange.length !== 2) {
      throw new BadRequestException(
        'dateRange must be a valid range with start and end dates',
      );
    }

    const beds = parseInt(numberOfBeds, 10);
    if (isNaN(beds)) {
      throw new BadRequestException('numberOfBeds must be a number');
    }

    return this.roomsService.searchRooms(parsedDateRange, beds);
  }

  @Post()
  async createRoom(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('numberOfBeds') numberOfBeds: number,
    @Body('price') price: number,
    @Body('availableDates') availableDates: string[],
  ): Promise<Room> {
    return this.roomsService.createRoom(
      name,
      description,
      numberOfBeds,
      price,
      availableDates,
    );
  }
}
