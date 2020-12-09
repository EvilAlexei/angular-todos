import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: {
    title: string,
    completed: boolean,
    edited: boolean
  }[];

  constructor() { }

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  private save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  private remove(id: number) {
    if (id !== -1) {
        this.todos.splice(id, 1);
    } 

    this.save();
  }

  private edit(id: number) {
    console.log(id);
    this.todos[id].edited = !this.todos[id].edited;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      const input = document.getElementById('edit-' + id);
      input.focus();
    },0); 
  }

  private saveEdit(id: number, title: string) {
    console.log(id, title);
    if (title == '') {
      this.remove(id);
    }
    else {
      this.todos[id].title = title;
      this.edit(id);
      this.save();
    }
  }

  private cancelEdit(id: number) {
    if (this.todos[id] && this.todos[id].edited) {
      this.todos[id].edited = false;
    }
  }

  public add(value: string) {
    let todo = {
      title: value,
      completed: false,
      edited: false
    }

    this.todos.push(todo);

    this.save();
  }

  private completed(id: number) {
    this.todos[id].completed = !this.todos[id].completed;

    this.save();
  }

}
