import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required]
    // });
  }

  submit(): void {
    let user = this.form.getRawValue();
    console.log(user);
    
    if (this.form.invalid) {
      Swal.fire("Error", "Please enter all the fields correctly", "error");
      return;
    }

    this.http.post("http://localhost:5000/api/login", user, {
      withCredentials: true
    })
    .subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => Swal.fire("Error", err.error.message, "error")
    });
  }
}
