import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo-demo/models/todo.model';
import { TodoService } from '../todo-demo/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  activeFilter = 'all';

  todos: Todo[] = [];

  count: number;

  constructor(
    private readonly todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoService.save2();
    this.load();
  }

  load(): void {
    this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

    this.updateCount();
  }

  save(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));

    this.updateCount();
  }

  remove(id: number): void {
    if (id !== -1) {
        this.todos.splice(id, 1);
    }

    this.save();
  }

  edit(id: number, input?: HTMLInputElement): void {
    this.todos[id].edited = !this.todos[id].edited;

    if (input) {
      setTimeout(() => { // this will make the execution after the above boolean has changed
        input.focus();
      }, 0);
    }
  }

  updateCount(): void {
    this.count = this.todos.filter(t => !t.completed).length;
  }

  saveEdit(id: number, title: string): void {
    console.log(id, title);
    if (title === '') {
      this.remove(id);
    }
    else {
      this.todos[id].title = title;
      this.edit(id);
      this.save();
    }
  }

  cancelEdit(id: number): void {
    if (this.todos[id] && this.todos[id].edited) {
      this.todos[id].edited = false;
    }
  }

  add(value: string): void {
    const todo: Todo = {
      title: value,
      completed: false,
      edited: false
    };

    this.todos.push(todo);

    this.save();
  }

  completed(id: number): void {
    this.todos[id].completed = !this.todos[id].completed;

    this.save();
  }

  log(msg: string): void {
    console.log(msg);
  }

  toggleAll(): void {
    let complete = true;

    if (this.count === 0) {
      complete = false;
    }
    this.todos.forEach(t => t.completed =  complete);

    this.save();
  }

  filter(filter: string): void {
    this.activeFilter = filter;
  }

  filterTodo(): Todo[] {
    console.log(22);

    if (this.activeFilter === 'completed') {
      return this.todos.filter(t => t.completed);
    }
    else if (this.activeFilter === 'active') {
      return this.todos.filter(t => !t.completed);
    }

    return this.todos;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(t => !t.completed);

    this.save();
  }

  trackByFn(index): number {
    return index;
  }
}
