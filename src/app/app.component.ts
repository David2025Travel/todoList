import { Component, signal } from '@angular/core';
import { TodoItem } from './model/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  count = 1;
  countIncompleteTask = signal<number>(0);
  task = "";
  showCompleteTask  = false;
  todoItemsMap : Map<number, TodoItem>;

  constructor(){
    this.todoItemsMap = new Map<number, TodoItem>();
  }

  get username() : String {
    console.log("get username");
    return "David"};

  addTask(){
    console.clear();
    console.log(" dans la methode addTask");
      this.todoItemsMap.set(this.count, new TodoItem(this.count, this.task));
      this.task="";
      this.countIncompleteTask.update(value => value+1);
      this.count++;
  }

  /*
  la detection au changement peut etre appliqué ici pour eviter
  une lecture inutu
  */

  putComplete(complete : boolean, id : number){
    console.clear();
    console.log(" dans la methode putComplete");
    
      if(complete) this.countIncompleteTask.update(value => value-1);
      else this.countIncompleteTask.update(value => value+1);
      this.todoItemsMap.forEach((todo, idTodo) => {
        if(id==idTodo) todo.complete=complete;
      });
  }

  get items() : readonly TodoItem[]{
      console.log("get items");
      
      if(this.showCompleteTask) return Array.from(this.todoItemsMap.values());
      return Array.from(this.todoItemsMap.values()).filter(todo=>!todo.complete);
    };

}
