import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateStore
} from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forChild({
      defaultLanguage: 'pl',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateStore],
  exports: [TranslateModule]
})
export class TranslationModule {}
