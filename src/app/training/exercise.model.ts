export interface Exercise{
    id:string,
    name:string,
    duration:number,
    calorise:number,
    date?:Date,
    state?: 'completed' | 'cancelld' | null
}