import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';

describe('RoomsController', () => {
  let controller: RoomsController;
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        {
          provide: RoomsService,
          useValue: {
            searchRooms: jest.fn().mockResolvedValue([]),
            createRoom: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchRooms', () => {
    it('should return an array of rooms', async () => {
      const result: Room[] = [];
      jest.spyOn(service, 'searchRooms').mockResolvedValue(result);

      expect(await controller.searchRooms('2024-06-10,2024-06-11', '2')).toBe(result);
    });
  });

  describe('createRoom', () => {
    it('should create a room and return it', async () => {
      const result: Room = {
        id: 1,
        name: 'Deluxe Room',
        description: 'A deluxe room with sea view',
        numberOfBeds: 2,
        price: 200,
        availableDates: ['2024-06-10', '2024-06-11', '2024-06-12'],
        bookings: [],
      };
      jest.spyOn(service, 'createRoom').mockResolvedValue(result);

      expect(
        await controller.createRoom(
          'Deluxe Room',
          'A deluxe room with sea view',
          2,
          200,
          ['2024-06-10', '2024-06-11', '2024-06-12'],
        ),
      ).toBe(result);
    });
  });
});
