import { Status } from "./status";

export interface Quest {
    questId: number,
    name: string,
    dateCreated: Date | string;
    dueDate: Date | string;
    isDeleted: boolean;
    priorityId: number,
    categoryId: number,
    statusId: number; 
}