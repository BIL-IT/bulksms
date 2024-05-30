import { Test, TestingModule } from '@nestjs/testing';
import { DlrController } from './dlr.controller';

describe('DlrController', () => {
  let controller: DlrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DlrController],
    }).compile();

    controller = module.get<DlrController>(DlrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
