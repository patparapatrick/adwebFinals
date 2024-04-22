import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = "http://localhost:5038/api/books/";

  constructor(private http: HttpClient) {}

  // Initialize books array
  books: any = [];

  // Fetch books from API on component initialization
  ngOnInit() {
    this.refreshBooks();
  }

  // Fetch books from API
  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data;
    });
  }

  // Add a new book
  addBook() {
    const newBook = (<HTMLInputElement>document.getElementById("newBook")).value;

    // Ensure title is not empty before adding
    if (!newBook.trim()) {
      alert('Please enter a tip before clicking the button');
      return;
    }

    const formData = new FormData();
    formData.append("title", newBook);

    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }

  // Delete a book
  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }
}
