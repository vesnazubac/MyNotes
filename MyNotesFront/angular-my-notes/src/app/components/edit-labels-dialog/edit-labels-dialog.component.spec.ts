import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabelsDialogComponent } from './edit-labels-dialog.component';

describe('EditLabelsDialogComponent', () => {
  let component: EditLabelsDialogComponent;
  let fixture: ComponentFixture<EditLabelsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLabelsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLabelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
