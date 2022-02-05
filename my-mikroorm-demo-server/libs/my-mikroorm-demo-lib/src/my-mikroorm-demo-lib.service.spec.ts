import { Test, TestingModule } from '@nestjs/testing';
import { MyMikroormDemoLibService } from './my-mikroorm-demo-lib.service';

describe('MyMikroormDemoLibService', () => {
  let service: MyMikroormDemoLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyMikroormDemoLibService],
    }).compile();

    service = module.get<MyMikroormDemoLibService>(MyMikroormDemoLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
