import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgregar } from './admin-agregar';

describe('AdminAgregar', () => {
  let component: AdminAgregar;
  let fixture: ComponentFixture<AdminAgregar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAgregar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgregar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
