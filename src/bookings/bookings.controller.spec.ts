import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        {
          provide: BookingsService,
          useValue: {
            bookRoom: jest.fn().mockResolvedValue('booking-id'),
            searchBookings: jest.fn().mockResolvedValue([]),
            cancelBooking: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('bookRoom', () => {
    it('should book a room and return the booking ID', async () => {
      const result = { bookingId: 'booking-id' };
      jest.spyOn(service, 'bookRoom').mockResolvedValue('booking-id');

      expect(await controller.bookRoom(
        'user123',
        1,
        '2024-06-10',
        '2024-06-15'
      )).toEqual(result);
    });
  });

  describe('searchBookings', () => {
    it('should return an array of bookings', async () => {
      const result: Booking[] = [];
      jest.spyOn(service, 'searchBookings').mockResolvedValue(result);

      expect(await controller.searchBookings('2024-06-10,2024-06-15')).toBe(result);
    });
  });

  describe('cancelBooking', () => {
    it('should cancel a booking', async () => {
      jest.spyOn(service, 'cancelBooking').mockResolvedValue(undefined);

      await expect(controller.cancelBooking('booking-id')).resolves.toBeUndefined();
    });
  });
});
