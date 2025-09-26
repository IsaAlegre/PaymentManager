import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  searchControl = new FormControl('');

  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  constructor() {
    // Escuchar cambios con debounce
    this.searchControl.valueChanges.subscribe(value => {
      if (value) {
        this.search.emit(value);
      }
    });
  }

  clearSearch(): void {
    this.searchControl.reset();
    this.cleared.emit();
  }
}
