import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { randInt } from './shared/utils';
import { Color, colorClass, randomDistinctColors } from './shared/models/color.enum';
import { factionData, factionsOfColor, randomFactions } from './shared/models/faction-data';
import { CommonModule } from '@angular/common';
import { Faction } from './shared/models/faction.enum';
import { Player } from './shared/models/player.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gaia-bidding';

  turn: number = 0
  private playerCount: number = 3
  private readonly _factions: Faction[] = randomFactions(this.playerCount)
  readonly factions = this.initFactions()
  readonly players = [
    this.setupPlayer('Tim'),
    this.setupPlayer('John'),
    this.setupPlayer('Alice'),
  ]


  setupPlayer(name: string): Player {
    let bids = new Map<Faction, number>()
    this._factions.forEach((v) => {
      bids.set(v, randInt(20))
    })
    return { name, bids }
  }

  initFactions() {
    let factions = new Map<Faction, any>()
    this._factions.forEach((v) => {
      let color = factionData.get(v)?.color

      factions.set(v, {
        name: v,
        bid: -1,
        player: undefined,
        color,
        colorClass: colorClass(color!),
      })
    })
    return factions
  }

  determineBid(bids: Map<Faction, { value: number, player: Player }>, biddingPlayer: Player): Faction | undefined {
    let bidentries = Array.from(bids.entries())
    let alreadyLeading = bidentries.some(([_faction, { value, player }]) => player?.name === biddingPlayer.name)
    if (alreadyLeading) return undefined
    let bidDiff: [Faction, number][] = bidentries.map(([faction, { value, player }]) => [faction, biddingPlayer.bids.get(faction) ?? 0 - value])
    console.log(bids)
    console.log(biddingPlayer)
    console.log(bidDiff)
    return undefined
  }


  get currentBids() {
    let c = Array.from(this.factions.entries())
    let d: [Faction, any][] = c.map(([faction, data]) => {
      return [faction, { value: data.bid, player: data.player }]
    })
    let e = new Map(d)
    return e
  }

  /*
  determineBid(biddingState, player) {
    // if you are already leading in some faction, don't bid
    let a = Array.from(biddingState.bidding.values())
    if (a.some((v) => v.player === player.name)) return undefined

    let currentBets = new Map([...biddingState.bidding])
    let dif = new Map([...player.bids])
    dif.forEach((v, k) => { dif.set(k, v - currentBets.get(k).value) })
    // currentBets.forEach((v, k) => { if (v.player === player.name) dif.delete(k) }) // remove factions where I'm already winning
    dif.forEach((v, k) => { if (v === 0) dif.delete(k) }) // remove factions where I'm at my maximum

    const max = getMaxValue(dif)
    dif.forEach((v, k) => { if (v != max.value) dif.delete(k) }) // remove factions that are not my highest priority

    // if there are no valid candidates return undefined
    if (dif.size === 0) return undefined
    let pick = randomMapKey(dif) // pick a random factions from the most desirable ones
    return pick.key
  }
  */

}
