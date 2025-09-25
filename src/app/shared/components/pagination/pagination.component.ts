import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html', // Usamos un archivo HTML externo
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  itemsPerPage = input.required<number>();
  @Output() pageChange = new EventEmitter<number>();

  public readonly Math = Math;

  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));

  onPrevious(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNext(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }
}
    
 