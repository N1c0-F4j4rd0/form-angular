import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Resorce } from '../../models/resource';
import { ResourceService } from '../../services/resource';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.html',
  styleUrls: ['./resource-list.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResourceList implements OnInit {
  @Output() editingResource = new EventEmitter<Resorce>();
  resources: Resorce[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.loadResource();
  }

  loadResource(): void {
    this.loading = true;
    this.resourceService.getResources().subscribe({
      next: (data) => {
        this.resources = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los recursos';
        this.loading = false;
        console.error('Error al cargar los recursos', error);
      }
    });
  }

  editResource(resource: Resorce): void {
    this.editingResource.emit(resource);
  }

  deleteResource(id: number | undefined): void {
    if (typeof id !== 'number') {
      alert('ID de recurso inválido');
      return;
    }
    if (confirm("Esta seguro de que desea eliminar este recurso?")) {
      this.resourceService.deleteResource(id).subscribe({
        next: () => {
          alert('Recurso eliminado con éxito');
          this.loadResource();
        },
        error: (error) => {
          console.error('Error al eliminar el recurso', error);
          alert('Error al eliminar el recurso');
        }
      });
    }
  }

  onResourceSaved(): void {
    this.loadResource();
  }
}