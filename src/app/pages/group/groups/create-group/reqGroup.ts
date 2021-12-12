import { ReqCandidate } from "./reqCandidate";

export interface ReqGroup{
    id?: number,
    nom: string,
    description: string,
    candidats: ReqCandidate[],
    sceances? : any,
}
