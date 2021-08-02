import { IGroup } from "./group";
import { ICandidate } from "./candidate";

export const candidate : ICandidate[]=[
    {
        CIN : "EE710600",
        firtName: "ilyass",
        lastName: "lfra3",
        email: "fra3@gmail.com",
        type: "post",
    },
    {
        CIN : "EE710604",
        firtName: "yassir",
        lastName: "shafnage",
        email: "fra31@gmail.com",
        type: "post",
    },
    {
        CIN : "EE710601",
        firtName: "ilyass",
        lastName: "lfra3",
        email: "fra32@gmail.com",
        type: "post",
    },
    {
        CIN : "EE710602",
        firtName: "abass",
        lastName: "stal",
        email: "fra33@gmail.com",
        type: "post",
    }
]
export const groups: IGroup[] = [
    {
        id: 1,
        name : 'G1',
        description : 'good group',
        candidates : [candidate[1],candidate[0]],
    },
    {
        id: 2,
        name : 'G2',
        description : 'bad group',
        candidates : [candidate[2],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3],candidate[3]],
    },
    {
        id: 3,
        name : 'G3',
        description : 'bad group',
        candidates : [],
    }
]