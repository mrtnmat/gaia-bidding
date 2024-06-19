import { randInt, randomMapKey } from "../utils";
import { Color, randomDistinctColors } from "./color.enum";
import { Faction } from "./faction.enum";

export const factionData = new Map<Faction, FactionData>([
    [Faction.Terrans, { name: Faction.Terrans, color: Color.Blue }],
    [Faction.Lantids, { name: Faction.Lantids, color: Color.Blue }],
    [Faction.Xenos, { name: Faction.Xenos, color: Color.Yellow }],
    [Faction.Gleens, { name: Faction.Gleens, color: Color.Yellow }],
    [Faction.Taklons, { name: Faction.Taklons, color: Color.Brown }],
    [Faction.Ambas, { name: Faction.Ambas, color: Color.Brown }],
    [Faction.HadschHallas, { name: Faction.HadschHallas, color: Color.Red }],
    [Faction.Ivits, { name: Faction.Ivits, color: Color.Red }],
    [Faction.Geodens, { name: Faction.Geodens, color: Color.Orange }],
    [Faction.BalTaks, { name: Faction.BalTaks, color: Color.Orange }],
    [Faction.Firaks, { name: Faction.Firaks, color: Color.Gray }],
    [Faction.Bescods, { name: Faction.Bescods, color: Color.Gray }],
    [Faction.Nevlas, { name: Faction.Nevlas, color: Color.White }],
    [Faction.Itars, { name: Faction.Itars, color: Color.White }],
])

export function factionsOfColor(color: Color) {
    return new Map<Faction, FactionData>([...factionData.entries()].filter((v) => v[1].color === color))
}

export function randomFactions(n: number): Faction[] {
    let col = randomDistinctColors(n)
    return col.map(factionsOfColor)
        .map(randomMapKey)
        .map((v) => v.key)
}

export interface FactionData {
    readonly name: Faction,
    readonly color: Color,
}