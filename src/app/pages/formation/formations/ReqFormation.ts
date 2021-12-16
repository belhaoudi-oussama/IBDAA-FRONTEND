import { Sceance } from "../../group/groups/Sceance";

export interface ReqFormation{
    id? : number,
    nom : string,
    description : string,
    duree : number,
    etat : string,
    type : string,
    formationSceances? : Sceance[]
}