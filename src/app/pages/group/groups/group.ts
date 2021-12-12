import { ICandidate } from "./candidate";

export interface IGroup{
    id:number,
    name: string,
    description: string,
    candidates: ICandidate[],
    sessions? : any[]
}