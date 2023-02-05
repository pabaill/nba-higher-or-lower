import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGamePageComponent } from './about-game-page.component';

describe('AboutGamePageComponent', () => {
  let component: AboutGamePageComponent;
  let fixture: ComponentFixture<AboutGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutGamePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
