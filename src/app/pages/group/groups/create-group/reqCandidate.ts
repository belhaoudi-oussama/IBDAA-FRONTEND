import { ReqGroup } from "./reqGroup"

export interface ReqCandidate{
    cin: string,
    nom: string,
    prenom: string,
    email: string,
    type: string,
    telephone? : string | null,
    adresse? : string | null,
    formationsCandidat?: [],
    groupe?: ReqGroup | null

}
