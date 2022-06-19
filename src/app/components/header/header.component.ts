import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Currency } from 'src/app/models/currency';
import { concatMap } from 'rxjs';
import { from as observableFrom } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HttpService],
})
export class HeaderComponent implements OnInit {
  currenciesRateList: Currency[] = [];
  errorMessage: string = '';
  dataLoaded: boolean = false;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    observableFrom(this.httpService.data)
      .pipe(
        concatMap((currency) =>
          this.httpService.getConvertingCurrency(currency, 'UAH', '1')
        )
      )
      .subscribe({
        next: (data: any) => {
          this.currenciesRateList.push(
            new Currency(data.query.from, data.result)
          );
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.statusText;
        },
        complete: () => {
          this.dataLoaded = true;
        },
      });
  }
}
