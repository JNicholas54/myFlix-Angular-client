import { Component, OnInit, Input } from '@angular/core';
// this import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// this import brings in the api clals we creaed in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';
// this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs top the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        console.log(result);
        //Logic for a successful user registration hoes here! (To be implemented)
        this.dialogRef.close(); // this will close the modal on success!
        this.snackBar.open('User registererd successfully!', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
