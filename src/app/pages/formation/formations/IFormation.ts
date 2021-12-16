import { Sceance } from "../../group/groups/Sceance";

export interface IFormation{
    id : number,
    name : string,
    descreption : string,
    duration : number,
    state : string,
    type : string,
    formationSceances? : Sceance[]
    search? : any;
}