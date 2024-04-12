import { Payload } from '@nestjs/microservices'

export function Value(): any {
  return (target: any, key: string, descriptor: any) => {
    return Payload('value')(target, key, descriptor)
  }
}
