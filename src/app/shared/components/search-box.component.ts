import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
  searchControl = new FormControl('');

  @Output() search = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Escuchar cambios con debounce para evitar emisiones excesivas
    this.searchControl.valueChanges.pipe(
      debounceTime(400), // Espera 400ms después de que el usuario deja de teclear
      distinctUntilChanged(), // Solo emite si el valor cambia
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.search.emit(value ?? '');
    });
  }

  clearSearch(): void {
    this.searchControl.setValue(''); // Usa setValue para disparar el valueChanges
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
