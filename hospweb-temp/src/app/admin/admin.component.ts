import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent  {
  departmentName: string = '';
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  uploadError: string = '';

  constructor(private http: HttpClient) {}

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (!this.departmentName || !this.selectedFile) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('departmentName', this.departmentName);
    formData.append('file', this.selectedFile);

    // API call to upload data
    this.http.post('http://127.0.0.1:5000/api/uploadDepartment', formData).subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.uploadError = '';
        this.departmentName = '';
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Error uploading department:', err);
        this.uploadError = 'Failed to upload department. Please try again.';
        this.uploadSuccess = false;
      }
    });
  }
  sub(){
    alert('Successfully uploaded map');
  }
}