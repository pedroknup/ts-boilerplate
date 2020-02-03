import { todo } from "../../../../api/src/entities/todo";

/** TodoMVC model definitions **/

export interface TodoModel extends todo {
  name: string,
  tempId?: number,
  isLoading?: boolean
}

// export namespace TodoModel {
//   export enum Filter {
//     SHOW_ALL = 'all',
//     SHOW_ACTIVE = 'active',
//     SHOW_COMPLETED = 'completed'
//   }
// }
