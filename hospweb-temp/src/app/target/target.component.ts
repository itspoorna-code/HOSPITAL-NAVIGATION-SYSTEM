import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MapService } from '../map.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrl: './target.component.css'
})
export class TargetComponent implements OnInit {
  departments: string[] = [];
  selectedDepartment = '';
  selectedPoint = '1';
  mapUrl: SafeResourceUrl | null = null;
  isLoading = false; // Track loading state

  constructor(private mapService: MapService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.mapService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = Array.isArray(departments) ? departments : [];
      },
      error: (err) => console.error('Error fetching departments:', err)
    });
  }

  generateMap(): void {
    if (!this.selectedDepartment || !this.selectedPoint) {
      alert('Please select both department and entry point.');
      return;
    }

    const requestData = {
      department: this.selectedDepartment,
      point: this.selectedPoint
    };

    this.isLoading = true; // Start the loading spinner

    this.mapService.generateMap(requestData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `http://127.0.0.1:5000${response.map_url}`
          );
        } else {
          alert('Failed to generate map.');
        }
        this.isLoading = false; // Stop the loading spinner
      },
      error: (err) => {
        console.error('Error generating map:', err);
        this.isLoading = false; // Stop the loading spinner
      }
    });
  }
}