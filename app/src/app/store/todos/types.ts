import { TodoModel } from 'app/models';


export interface ITodoState {
  isLoading: boolean;
  updatedAt?: Date;
  todos?: TodoModel[];
}

