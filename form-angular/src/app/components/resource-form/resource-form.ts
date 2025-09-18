import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Resorce } from '../../models/resource';
import { PostsService } from '../../services/resource';

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
  @Output() resourceSaved = new EventEmitter<Resorce>();

  resource: Resorce = { title: '', body: '', userId: 1 };

  categories = ['Tecnologia', 'Educación', 'Salud', 'Negocios'];
  statuses = ['active', 'inactive', 'pending'];

  constructor(private resourceService: PostsService) { }

  ngOnInit(): void {
    if (this.editingResource) {
      this.resource = { ...this.editingResource };
    }
  }

  onSubmit(): void {
  if (this.resource.id) {
    this.resourceService.update(this.resource.id!, this.resource)
      .subscribe({
        next: (updated) => {
          alert('Recurso actualizado con éxito');
          this.resourceSaved.emit(updated); // enviamos el objeto
          this.resetForm();
        },
        error: (error) => console.error('Error al actualizar', error)
      });
  } else {
    this.resourceService.create(this.resource)
      .subscribe({
        next: (created) => {
          alert('Recurso creado con éxito');
          this.resourceSaved.emit(created); // enviamos el objeto creado
          this.resetForm();
        },
        error: (error) => console.error('Error al crear', error)
      });
  }
}

  resetForm(): void {
    this.resource = { title: '', body: '', userId: 1 };
    this.editingResource = null;
  }
}
