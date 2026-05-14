import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityListComponent } from '../priority-list/priority-list.component';


describe('PriorityListComponent', () => {
  let component: PriorityListComponent;
  let fixture: ComponentFixture<PriorityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriorityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriorityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
