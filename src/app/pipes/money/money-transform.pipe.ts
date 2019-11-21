import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'money' })
export class MoneyTransformPipe implements PipeTransform {
  transform(value: number): string {
    return `${Math.ceil(value)/100}`.replace(/\d{3}(?=.{3})/g, '$& ');
  }
}