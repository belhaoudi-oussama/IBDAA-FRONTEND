import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
import { IGroup } from "./group";

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<IGroup> | null;
    priority : number | boolean
}