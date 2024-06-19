import { Faction } from "./faction.enum"

export interface Player {
    readonly name: string
    readonly bids: Map<Faction, number>
}