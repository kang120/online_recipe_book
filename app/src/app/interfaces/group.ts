import { GroupCategory } from "./group-category";

export interface Group {
    id?: number,
    groupName: string,
    isPrivate: boolean,
    password: string,
    category: GroupCategory,
    leaderId: number
}
