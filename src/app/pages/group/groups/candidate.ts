import { ReqGroup } from "./create-group/reqGroup";

export interface ICandidate{
    id?: number | null,
    CIN?: string | null,
    firtName?: string | null,
    lastName?: string | null,
    email?: string | null,
    type?: string | null,
    phone? : string | null,
    adresse? : string | null,
    formationsCandidat?: [],
    groupe?: ReqGroup | null

}