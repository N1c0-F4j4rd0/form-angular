import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResourceList } from './components/resource-list/resource-list';
import { ResourceForm } from './components/resource-form/resource-form';
import { Resorce } from './models/resource';
import { PostsService } from './services/resource';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, ResourceList, ResourceForm, HttpClientModule]
})
export class AppComponent implements OnInit {
  title = 'Sistema CRUD';
  editingResource: Resorce | null = null;
  resources: Resorce[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.postService.getAll().subscribe(data => {
      this.resources = data;
    });
  }

  onEditResource(resource: Resorce) {
    this.editingResource = resource;
  }

  onResourceSaved(resource: Resorce) {
    if (resource.id) {
      // Actualizar en la lista local
      const index = this.resources.findIndex(r => r.id === resource.id);
      if (index !== -1) this.resources[index] = resource;
      else this.resources.unshift(resource);
    } else {
      // Crear uno nuevo
      resource.id = this.resources.length + 101; // id fake
      this.resources.unshift(resource);
    }
    this.editingResource = null;
  }

  onDeleteResource(id: number) {
    this.resources = this.resources.filter(r => r.id !== id);
  }
}

export { AppComponent as App };
