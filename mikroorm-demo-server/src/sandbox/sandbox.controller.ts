import { Controller, Delete, Get, Logger, ParseBoolPipe, Post, Query } from '@nestjs/common';
import { SandboxService } from './sandbox.service';

@Controller('sandbox')
export class SandboxController {
  constructor(private sandboxService: SandboxService) {}

  @Get('emDumpWithFind')
  emDumpWithFind() {
    this.sandboxService.emDumpWithFind();
  }

  @Post('manyToOneOptional')
  manyToOneOptional(@Query('assign', ParseBoolPipe) assign: boolean) {
    this.sandboxService.manyToOneOptional(assign);
  }

  kutya(num: number): number;
  kutya(num: number, s?: string): number {
    if (s === undefined) {
      s = '111';
    }
    return 1;
  }

  add(first: number, second: number): number; //Overload signature with two parameters
  add(first: number, second: number, third: number): number; //Overload signature with three parameters
  add(first: number, second: number, third?: number, fourth?: number): number {
    //Implementation signature
    if (first !== undefined && second !== undefined && third !== undefined) {
      return first + second + third;
    } else {
      return first + second;
    }
  }
}
