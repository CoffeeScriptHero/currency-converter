import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
  providers: [HttpService],
})
export class ConverterComponent {
  currencies: string[] = ['USD', 'UAH', 'EUR', 'PLN', 'CZK'];
  flags = {
    USD: `🇺🇸`,
    EUR: `🇪🇺`,
    UAH: `🇺🇦`,
    PLN: `🇵🇱`,
    CZK: `🇨🇿`,
  };
  firstSelect: string = 'USD'; // select value
  secondSelect: string = 'UAH';
  firstInput: string = ''; // input value
  secondInput: string = '';

  constructor(private httpService: HttpService) {}

  getFlag(currency: string) {
    return this.flags[currency as keyof typeof this.flags];
  }

  convert(swap: boolean = false, reverse: boolean = false) {
    // swap = true if button with convert arrows clicked
    // reverse = true if user types in second input
    if (swap) {
      [this.firstSelect, this.secondSelect] = [
        this.secondSelect,
        this.firstSelect,
      ];

      if (!this.firstInput) return;
    }

    this.httpService
      .getConvertingCurrency(
        reverse ? this.secondSelect : this.firstSelect,
        reverse ? this.firstSelect : this.secondSelect,
        reverse ? this.secondInput : this.firstInput
      )
      .subscribe((data: any) => {
        if (reverse) this.firstInput = data.result;
        else this.secondInput = data.result;
      });
  }
}
