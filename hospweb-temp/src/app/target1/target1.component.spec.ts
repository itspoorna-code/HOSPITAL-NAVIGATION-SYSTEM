import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Target1Component } from './target1.component';

describe('Target1Component', () => {
  let component: Target1Component;
  let fixture: ComponentFixture<Target1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Target1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Target1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
