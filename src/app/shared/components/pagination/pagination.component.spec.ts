import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;


    fixture.componentRef.setInput('currentPage', 1);
    fixture.componentRef.setInput('totalItems', 50);
    fixture.componentRef.setInput('itemsPerPage', 10);

    fixture.detectChanges();
  });

  it('debería renderizar el rango correcto en la primera página', () => {
    const text = fixture.debugElement.query(By.css('p')).nativeElement.textContent;
    const normalized = text.replace(/\s+/g, ' ').trim(); 
    expect(normalized).toContain('Mostrando 1 - 10 de 50');
    });

  it('debería deshabilitar el botón "Anterior" en la primera página', () => {
    const prevBtn = fixture.debugElement.query(By.css('button[aria-label="Página anterior"]')).nativeElement;
    expect(prevBtn.disabled).toBeTrue();
  });

  it('debería deshabilitar el botón "Siguiente" en la última página', () => {
    fixture.componentRef.setInput('currentPage', 5); // 50 / 10 = 5 páginas
    fixture.detectChanges();
    const nextBtn = fixture.debugElement.query(By.css('button[aria-label="Página siguiente"]')).nativeElement;
    expect(nextBtn.disabled).toBeTrue();
  });

  it('debería emitir pageChange al hacer click en "Anterior"', () => {
    spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('currentPage', 3);
    fixture.detectChanges();

    const prevBtn = fixture.debugElement.query(By.css('button[aria-label="Página anterior"]')).nativeElement;
    prevBtn.click();

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('debería emitir pageChange al hacer click en "Siguiente"', () => {
    spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('currentPage', 3);
    fixture.detectChanges();

    const nextBtn = fixture.debugElement.query(By.css('button[aria-label="Página siguiente"]')).nativeElement;
    nextBtn.click();

    expect(component.pageChange.emit).toHaveBeenCalledWith(4);
  });
});
