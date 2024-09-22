import { Component } from '@angular/core';
import { TodoItem } from './model/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  username = "David"
  count = 1;
  countIncompleteTask =0;
  task = ""
  showCompleteTask  = false;
  todoItemsMap : Map<number, TodoItem>;

  constructor(){
    this.todoItemsMap = new Map<number, TodoItem>();
  }

  addTask(){
      this.todoItemsMap.set(this.count, new TodoItem(this.count, this.task));
      this.task=""
      this.countIncompleteTask++;
      this.count++;
  }

  putComplete(complete : boolean, id : number){
      if(complete) this.countIncompleteTask--;
      else this.countIncompleteTask++;
      this.todoItemsMap.forEach((todo, idTodo) => {
        if(id==idTodo) todo.complete=complete;
      });
  }

  get items() : readonly TodoItem[]{
      if(this.showCompleteTask) return Array.from(this.todoItemsMap.values());
      return Array.from(this.todoItemsMap.values()).filter(todo=>!todo.complete);
    };

}
