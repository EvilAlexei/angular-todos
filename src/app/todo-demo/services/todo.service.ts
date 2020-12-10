import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  data: undefined | number = undefined;

  save2(): boolean {
    return true;
  }
}
