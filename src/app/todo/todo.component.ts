import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { Item } from '../item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() selectedItem: Item;
  items: Item[];
  public shouldOpen = false;
  public isSelected = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void
  {
    this.todoService.getList().subscribe(items => this.items = items)
  }

  add(description: string): void
  {
    description = description.trim();

    if (!description)
    {
      return;
    }

    this.todoService.addToList({description} as Item)
        .subscribe(item => this.items.push(item));
    this.shouldOpen = false;
  }

  save(): void {
    this.todoService.updateItem(this.selectedItem)
      .subscribe();
    this.isSelected = false;
  }

  openChildComponent()
  {
    this.shouldOpen = true;
    this.isSelected = false;
  }

  delete(item: Item): void
  {
    this.items = this.items.filter(i => i !== item);
    this.todoService.deleteItem(item).subscribe();
  }

  onSelect(item: Item): void
  {
    this.selectedItem = item;
    this.shouldOpen = false;
    this.isSelected = true;
  }

  cancel()
  {
    this.isSelected = false;
    this.shouldOpen = false;
  }
}
