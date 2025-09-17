
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResourceList } from './components/resource-list/resource-list';
import { ResourceForm } from './components/resource-form/resource-form';
import { Resorce } from './models/resource';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, ResourceList, ResourceForm, HttpClientModule]
})
export class AppComponent {
  title = 'Sistema CRUD';
  editingResource: Resorce | null = null;

  onEditResource(resource: Resorce) {
    this.editingResource = resource;
  }

  onResourceSaved() {
    this.editingResource = null;
  }
}

export { AppComponent as App };