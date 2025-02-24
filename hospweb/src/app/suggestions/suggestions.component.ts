import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
  
})
export class SuggestionsComponent {
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.reviewForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      feedback: ['', [Validators.required, Validators.maxLength(500)]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.http.post('http://localhost:5000/api/reviews', this.reviewForm.value)
        .subscribe(response => {
          alert('Submited Review Successfully');
          console.log('Review Submitted', response);
        }, error => {
          console.log('Error:', error);
        });
    }
  }
}
