import { ReqGroup } from "./reqGroup"

export interface ReqCandidate{
    id?: number | null,
    cin?: string | null,
    nom?: string | null,
    prenom?: string | null,
    email?: string | null,
    type?: string | null,
    telephone? : string | null,
    adresse? : string | null,
    groupe?: ReqGroup | null

}
