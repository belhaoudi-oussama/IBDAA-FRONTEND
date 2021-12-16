import { ReqFormation } from "../../formation/formations/ReqFormation";
import { ReqGroup } from "./create-group/reqGroup";
import { IGroup } from "./group";

export interface Sceance {
    id? : number,
    nom:string,
    dateTimeDebut:string,
    dateTimeFin:string,
    formateur:string,
    groupe:IGroup ,
    formation? : ReqFormation;
    DateGroup? : any,
    groupReq? :ReqGroup
}