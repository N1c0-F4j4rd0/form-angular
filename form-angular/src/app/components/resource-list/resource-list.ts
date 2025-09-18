import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resorce } from '../../models/resource';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.html',
  styleUrls: ['./resource-list.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResourceList {
  @Input() resources: Resorce[] = [];
  @Output() editingResource = new EventEmitter<Resorce>();
  @Output() deletedResource = new EventEmitter<number>();

  editResource(resource: Resorce): void {
    this.editingResource.emit(resource);
  }

  deleteResource(id: number | undefined): void {
    if (typeof id !== 'number') {
      alert('ID de recurso inválido');
      return;
    }
    if (confirm("¿Está seguro de que desea eliminar este recurso?")) {
      this.deletedResource.emit(id);
    }
  }
}
