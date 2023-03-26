import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

  public langOptions: ILangOption[] = langOptions;
  public selectedLang: ILangOption = langOptions[0];

  onSelectionChange(change: MatSelectChange) {
    this.selectedLang = change.value;
    this.select.close();
  }
}
