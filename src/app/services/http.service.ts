import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  data: string[] = ['USD', 'EUR', 'PLN', 'CZK'];
  constructor(private http: HttpClient) {}

  getRequestURL(from: string, to: string, amount: string): string {
    return `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
  }

  getConvertingCurrency(from: string, to: string, amount: string) {
    return this.http.get(this.getRequestURL(from, to, amount));
  }
}
