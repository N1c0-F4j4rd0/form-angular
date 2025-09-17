import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Resorce } from '../../models/resource';
import { ResourceService } from '../../services/resource';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.html',
  styleUrls: ['./resource-form.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ResourceForm implements OnInit{
  @Input() editingResource: Resorce | null = null;
  @Output() resourceSaved = new EventEmitter<void>();

  resource: Resorce = { title: '', body: '', userId: 1, id: 0 };

  categories = ['Tecnologia', 'Educación', 'Salud', 'Negocios'];
  statuses = ['active', 'inactive', 'pending'];

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    if (this.editingResource) {
      this.resource = { ...this.editingResource };
    }
  }

  onSubmit(): void {
    if (this.resource.id) {
      this.resourceService.updateResource(this.resource.id, this.resource)
      .subscribe({
        next: () => {
          alert('Recurso actualizado con éxito');
          this.resetForm();
          this.resourceSaved.emit();
        },
        error: (error) => {
          console.error('Error al actualizar el recurso', error);
          alert('Error al actualizar el recurso');
        }
      });
    } else {
      this.resourceService.createResource(this.resource)
      .subscribe({
        next: () => {
          alert('Recurso creado con éxito');
          this.resetForm();
          this.resourceSaved.emit();
        },
        error: (error) => {
          console.error('Error al crear el recurso', error);
          alert('Error al crear el recurso');
        }
      });
    }
  }

  resetForm(): void {
  this.resource = { title: '', body: '', userId: 1, id: 0 };
    this.editingResource = null;
  }
}
