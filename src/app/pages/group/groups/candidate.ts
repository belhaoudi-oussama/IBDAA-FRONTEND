import { ReqGroup } from "./create-group/reqGroup";

export interface ICandidate{
    CIN: string,
    firtName: string,
    lastName: string,
    email: string,
    type: string,
    phone? : string | null,
    adresse? : string | null,
    formationsCandidat?: [],
    groupe?: ReqGroup | null

}