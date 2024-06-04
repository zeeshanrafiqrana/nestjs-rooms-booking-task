import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async bookRoom(
    @Body('userId') userId: string,
    @Body('roomId') roomId: number,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
  ): Promise<{ bookingId: string }> {
    const bookingId = await this.bookingsService.bookRoom(
      userId,
      roomId,
      startDate,
      endDate,
    );
    return { bookingId };
  }

  @Get()
  async searchBookings(
    @Query('dateRange') dateRange: string,
  ): Promise<Booking[]> {
    const parsedDateRange = dateRange.split(',');
    if (parsedDateRange.length !== 2) {
      throw new Error(
        'dateRange must be a valid range with start and end dates',
      );
    }
    return this.bookingsService.searchBookings(parsedDateRange);
  }
}
