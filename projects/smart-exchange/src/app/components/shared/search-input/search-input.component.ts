import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatInput } from '@angular/material/input';
import { SearchInputSize } from './search-input.type';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @ViewChild(MatInput) input: MatInput = {} as MatInput;

  /** Placeholder for input text. Empty by default. */
  @Input() placeholder: string = "";

  /** Defines size of the input. Default to 'medium'. */
  @Input() size: SearchInputSize = 'medium';

  /** Determines whether or not leave space for displaying errors. Default to `false`. */
  @Input() disableSubscript: boolean = false;

  /** Specifies whether the input should be full width. Default to `false`. */
  @Input() fullWidth: boolean = false;

  /** Value to emit on key up. */
  @Output() keyup = new EventEmitter<string>();

  /** Triggers clear input. */
  @Output() clear = new EventEmitter<void>();

  onKeyUp(event: Event): void {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    this.keyup.emit(value);
  }

  onClear(): void {
    this.input.value = "";
    this.clear.emit();
  }
}
