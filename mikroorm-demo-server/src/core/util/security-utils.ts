import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class SecurityUtils {
  public static async hashString(str: string): Promise<string> {
    return bcrypt.hash(str, 10);

    /*    // dev
    console.log('HASH[' + str + ']');
    return str + '.encrypted';*/
  }

  public static async validateString(str: string, hash: string): Promise<boolean> {
    return bcrypt.compare(str, hash);

    // dev
    /*    const items = hash.split('.');
    const decrypted = items[0];
    return str === decrypted;*/
  }
}
