import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example',
  template: `
    <!-- Angular template with directives -->
    <div class="container">
      <h1>{{ title }}</h1>
      
      <!-- Property binding and event binding -->
      <input 
        [(ngModel)]="userInput" 
        (keyup.enter)="addItem()"
        [placeholder]="placeholderText"
        type="text"
      />
      
      <!-- Structural directives -->
      <button 
        (click)="addItem()"
        [disabled]="!userInput"
      >
        Add Item
      </button>
      
      <ul>
        <!-- NgFor directive -->
        <li 
          *ngFor="let item of items; let i = index; trackBy: trackByFn"
          [class.completed]="item.completed"
          (click)="toggleItem(item)"
        >
          {{ i + 1 }}. {{ item.text }}
          
          <!-- NgIf directive -->
          <span *ngIf="item.completed" class="done-badge">✓</span>
          
          <!-- Event with $event -->
          <input 
            type="checkbox" 
            [checked]="item.completed"
            (change)="onCheckboxChange($event, item)"
          />
        </li>
      </ul>
      
      <!-- NgSwitch directives -->
      <div [ngSwitch]="status">
        <p *ngSwitchCase="'loading'">Loading...</p>
        <p *ngSwitchCase="'empty'" class="empty-state">No items found</p>
        <p *ngSwitchDefault>{{ status }}</p>
      </div>
      
      <!-- Component input/output binding -->
      <app-child-component 
        [childItems]="items"
        (itemSelected)="onItemSelected($event)"
        [config]="configObject"
      >
      </app-child-component>
      
      <!-- Template reference variable -->
      <div #contentDiv>
        <p>Content here...</p>
      </div>
      
      <!-- Pipes -->
      <p>Current time: {{ currentTime | date:'medium' }}</p>
      <p>Items count: {{ items.length | number }}</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    .completed {
      text-decoration: line-through;
      color: #999;
    }
    
    .done-badge {
      color: green;
      font-weight: bold;
    }
    
    .empty-state {
      color: #666;
      font-style: italic;
    }
  `]
})
export class ExampleComponent implements OnInit {
  @Input() title: string = 'Angular App';
  @Input() placeholderText: string = 'Type something...';
  @Output() itemAdded = new EventEmitter<any>();
  
  userInput: string = '';
  items: Array<{text: string, completed: boolean}> = [
    { text: 'Learn Angular', completed: true },
    { text: 'Build app', completed: false }
  ];
  currentTime: Date = new Date();
  status: string = 'active';
  
  configObject = {
    theme: 'default',
    showHeader: true
  };
  
  constructor() { }
  
  ngOnInit(): void {
    console.log('ExampleComponent initialized');
    this.updateStatus();
  }
  
  addItem(): void {
    if (this.userInput.trim()) {
      this.items.push({
        text: this.userInput,
        completed: false
      });
      this.userInput = '';
      this.itemAdded.emit(this.items.length);
      this.updateStatus();
    }
  }
  
  toggleItem(item: {text: string, completed: boolean}): void {
    item.completed = !item.completed;
    this.updateStatus();
  }
  
  onCheckboxChange(event: any, item: {text: string, completed: boolean}): void {
    item.completed = event.target.checked;
    this.updateStatus();
  }
  
  onItemSelected(item: any): void {
    console.log('Item selected:', item);
  }
  
  trackByFn(index: number, item: any): any {
    return index;
  }
  
  updateStatus(): void {
    if (this.items.length === 0) {
      this.status = 'empty';
    } else if (this.items.every(item => item.completed)) {
      this.status = 'all-done';
    } else {
      this.status = `Active: ${this.items.filter(i => !i.completed).length}`;
    }
  }
  
  // Using an observable
  getCurrentTime(): Observable<Date> {
    return new Observable(observer => {
      const timer = setInterval(() => {
        observer.next(new Date());
      }, 1000);
      
      return () => clearInterval(timer);
    });
  }
}