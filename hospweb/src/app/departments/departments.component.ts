import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments = [
    {
      name: 'Obstetrics & Gynecology',
      activeDays: ['Monday', 'Tuesday', 'Wednesday'],
      image: 'assets/o_g.jpg',
      description: 'Specialized care for women’s health, from pregnancy to menopause.'
    },
    {
      name: 'Pediatric & Surgery',
      activeDays: ['Monday', 'Thursday', 'Friday'],
      image: 'assets/p-s.jpg',
      description: 'Comprehensive healthcare for children, from birth to adolescence.'
    },
    {
      name: 'Laparoscopic & General Surgery',
      activeDays: ['Wednesday', 'Thursday'],
      image: 'assets/l-g.jpg',
      description: 'Minimally invasive surgery for quicker recovery and reduced risks.'
    },
    {
      name: 'Orthopedic & Trauma Care Unit',
      activeDays: ['Tuesday', 'Friday', 'Saturday'],
      image: 'assets/orthopedics.jpg',
      description: 'Expert care for bone and joint injuries, fractures, and rehabilitation.'
    },
    {
      name: 'Diabetic Care Unit',
      activeDays: ['Monday', 'Wednesday'],
      image: 'assets/diabitic.jpg',
      description: 'Comprehensive care for managing diabetes and its complications.'
    },
    {
      name: 'General & Laparoscopic',
      activeDays: ['Monday', 'Wednesday'],
      image: 'assets/g-l.jpg',
      description: 'General surgery includes various procedures, while laparoscopic surgery uses small incisions and a camera.'
    },
    {
      name: 'Intensive Care Unit',
      activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      image: 'assets/int-care.jpg',
      description: 'Critical care for patients with life-threatening conditions.'
    },
    {
      name: 'Cardiology',
      activeDays: ['Thursday', 'Saturday'],
      image: 'assets/cardiology.jpg',
      description: 'Care for heart-related issues, from preventive care to complex surgeries.'
    },
    {
      name: 'General Medicine',
      activeDays: ['Friday', 'Sunday'],
      image: 'assets/gen-med.jpg',
      description: 'General medical care for adults, including diagnosis and treatment of various conditions.'
    }
  ];

  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  today: string = '';
  selectedDay: string = '';
  activeDepartments: any[] = [];

  ngOnInit() {
    this.today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    this.selectedDay = this.today;
    this.filterDepartments();
  }

  filterDepartments() {
    this.activeDepartments = this.departments.filter(department =>
      department.activeDays.includes(this.selectedDay)
    );
  }
}
