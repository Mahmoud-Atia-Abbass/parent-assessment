import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroTrash, heroPencil, heroArrowRight, heroChevronRight, heroPlus } from '@ng-icons/heroicons/outline';



@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ heroTrash, heroPencil, heroArrowRight, heroChevronRight, heroPlus }),
  ],
})
export class UsersModule { }
