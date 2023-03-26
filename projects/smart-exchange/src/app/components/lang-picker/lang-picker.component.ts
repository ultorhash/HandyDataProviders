import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { langOptions } from './lang-picker.data';
import { ILangOption } from './lang-picker.interface';

@Component({
  selector: 'app-lang-picker',
  templateUrl: './lang-picker.component.html',
  styleUrls: ['./lang-picker.component.scss']
})
export class LangPickerComponent {
  @ViewChild(MatSelect) select: MatSelect = {} as MatSelect;

  constructor(private translateService: TranslateService) {}

  public langOptions: ILangOption[] = langOptions;
  public selectedLang: ILangOption = langOptions[0];

  onSelectionChange(change: MatSelectChange): void {
    const value = change.value as ILangOption;

    this.selectedLang = value;
    this.select.close();
    this.translateService.use(value.code);
  }
}
