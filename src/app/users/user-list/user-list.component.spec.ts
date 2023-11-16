import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowRight, heroPencil, heroTrash, heroChevronRight, heroPlus } from '@ng-icons/heroicons/outline';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [NgxsModule.forRoot(), SharedModule, NgIconsModule.withIcons({ heroTrash, heroPencil, heroArrowRight, heroChevronRight, heroPlus })]
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
