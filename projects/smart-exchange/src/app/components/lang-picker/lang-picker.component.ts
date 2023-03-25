import { Component } from '@angular/core';
import { langOptions } from './lang-picker.data';
import { ILangOption } from './lang-picker.interface';

@Component({
  selector: 'app-lang-picker',
  templateUrl: './lang-picker.component.html',
  styleUrls: ['./lang-picker.component.scss']
})
export class LangPickerComponent {
  public langOptions: ILangOption[] = langOptions;
  public selectedLang: ILangOption = langOptions[0];

  onLangChange(langOption: ILangOption): void {
    this.selectedLang = langOption;
  }
}
