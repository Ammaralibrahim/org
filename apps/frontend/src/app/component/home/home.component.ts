import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],  // HttpClientModule eklenmeli
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // 'styleUrl' yerine 'styleUrls'
})
export class HomeComponent implements OnInit {
  message: string = '';  // 'message' değişkeni için doğru tip ve başlangıç değeri

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:5000/api/user", {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
      },
      (err) => {
        this.message = "You are not logged in";
      }
    );
  }
}
