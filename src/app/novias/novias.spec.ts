import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Novias } from './novias';

describe('Novias', () => {
  let component: Novias;
  let fixture: ComponentFixture<Novias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Novias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Novias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
