import { Test, TestingModule } from '@nestjs/testing';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';

describe('FundController', () => {
  let controller: FundController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundController],
      providers: [FundService],
    }).compile();

    controller = module.get<FundController>(FundController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
