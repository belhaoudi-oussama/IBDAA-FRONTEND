export interface ICandidate{
    CIN: string,
    firtName: string,
    lastName: string,
    email: string,
    type: string,
    company?: string,
    parteners?: ICandidate[],

}