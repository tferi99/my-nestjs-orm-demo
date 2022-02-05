import { Module } from '@nestjs/common';
import { MyMikroormDemoLibService } from './my-mikroorm-demo-lib.service';

@Module({
  providers: [MyMikroormDemoLibService],
  exports: [MyMikroormDemoLibService],
})
export class MyMikroormDemoLibModule {}
