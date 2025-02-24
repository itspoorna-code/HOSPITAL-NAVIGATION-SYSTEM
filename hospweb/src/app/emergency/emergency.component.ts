import { Component } from '@angular/core';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.css'
})
export class EmergencyComponent {
 // Toggle state for services visibility
 showServices = false;

 // List of Emergency Services
 services = [
  { title: 'Trauma and Accident Care', description: 'Immediate treatment for injuries from accidents, falls, or violence.' },
  { title: 'Cardiac Emergency Services', description: 'Management of heart attacks and cardiac arrest.' },
  { title: 'Stroke Management', description: 'Rapid assessment and treatment of strokes to prevent long-term damage.' },
  { title: 'Poisoning and Overdose Treatment', description: 'Care for poisoning, drug overdose, or chemical exposure.' },
  { title: 'Emergency Surgery', description: 'Immediate surgeries for life-threatening conditions like ruptured organs.' },
  { title: 'Respiratory Emergencies', description: 'Treatment for severe asthma attacks, choking, or respiratory failure.' },
  { title: 'Obstetric Emergencies', description: 'Care for pregnancy-related complications such as emergency C-sections.' },
  { title: 'Pediatric Emergencies', description: 'Treatment for critical illnesses or injuries in children.' },
  { title: 'Neurological Emergencies', description: 'Care for seizures, brain injuries, or sudden neurological deficits.' },
  { title: 'Psychiatric Emergencies', description: 'Management of acute mental health crises.' },
  { title: 'Infectious Disease Management', description: 'Isolation and treatment of infectious diseases like meningitis or sepsis.' },
  { title: 'Burn Care', description: 'Specialized treatment for severe burns and smoke inhalation injuries.' },
  { title: '24/7 Emergency Pharmacy', description: 'Essential medications for emergency treatment.' },
  { title: 'Ambulance Services', description: 'Rapid transport to the hospital with life support equipment.' },
  { title: 'Diagnostic Support', description: 'Immediate imaging and lab tests for quick diagnosis.' }
];


lastBookedService: string | null = null;

// Toggle visibility of services
toggleServices() {
  this.showServices = !this.showServices;
}

// Booking a service
bookService(serviceTitle: string) {
  this.lastBookedService = serviceTitle;
  alert(`You have successfully booked: ${serviceTitle}`);
}
  
}
