import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/users.model';
import { DeleteUserAction, EditUserAction, GetUsersAction } from 'src/app/state/users-list.actions';
import { UsersState } from 'src/app/state/users-list.state';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private store: Store) { };

  subManager = new Subscription();
  @ViewChild('deleteModal') deleteModalTemplate: any;
  @ViewChild('editModal') editModalTemplate: any;

  @Select(UsersState.userState)
  userState$!: Observable<UserModel[]>;
  usersList: UserModel[] = [];
  activeProfile!: UserModel;

  userForm!: FormGroup;

  ngOnInit(): void {
    this.subscribeToUsersState();
    this.dispatchUsersActions();
    this.setForm();
  }

  setForm(profile?: UserModel) {
    this.userForm = this.fb.group({
      first_name: [profile?.first_name ?? '', [Validators.required]],
      last_name: [profile?.last_name ?? ''],
      email: [profile?.email ?? '', [Validators.required]],
    });
  }

  dispatchUsersActions(): void {
    this.store.dispatch(new GetUsersAction());
  }

  subscribeToUsersState(): void {
    this.subManager.add(this.userState$.subscribe((response) => {
      if (response) { this.usersList = response };
    }));
  }

  openEdit(user?: UserModel, event?: any): void {
    console.log('us', user)
    this.setForm(user);
    event?.stopPropagation();
    this.modalService.open(this.editModalTemplate).result.then(
      (result) => {
        if (result === 'create') {
          this.submitForm();
        };
      }, (err) => {
        return err;
      }
    );
  }

  deleteUser(user: UserModel): void {
    if (user.id === this.activeProfile.id) {
      this.activeProfile['active'] = false;
    }
    this.store.dispatch(new DeleteUserAction(user.id));
  }

  openDelete(user: UserModel, event?: any): void {
    event?.stopPropagation();
    this.modalService.open(this.deleteModalTemplate).result.then(
      (result) => {
        if (result === 'approve') { this.deleteUser(user) };
      }, (err) => {
        return err;
      }
    );
  }

  trackByFn(index: number, item: UserModel) {
    return item.id;
  }

  activeUser(userID: number) {
    for (let i = 0; i < this.usersList.length; i++) {
      if (userID === this.usersList[i].id) {
        this.activeProfile = this.usersList[i];
        this.activeProfile['active'] = true;
      } else {
        this.usersList[i]['active'] = false;
      }
    }
  }

  submitForm() {
    if (this.userForm.valid) {
      const first_name = this.userForm.get('first_name')?.value;
      const last_name = this.userForm.get('last_name')?.value;
      const email = this.userForm.get('email')?.value;
      // should dispatching the edit action here to update the user with select ID
    }
  }

  ngOnDestroy(): void {
    this.subManager.unsubscribe();
  }

}
