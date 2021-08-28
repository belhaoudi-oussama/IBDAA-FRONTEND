import { ReqCandidate } from "./reqCandidate";

export interface ReqGroup{
    nom: string,
    description: string,
    candidats: ReqCandidate[],
}
