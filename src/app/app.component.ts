import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { randInt, randomArrayElement } from './shared/utils';
import { Color, colorClass, randomDistinctColors } from './shared/models/color.enum';
import { factionData, factionsOfColor, randomFactions } from './shared/models/faction-data';
import { CommonModule } from '@angular/common';
import { Faction } from './shared/models/faction.enum';
import { Player } from './shared/models/player.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
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
  selectedPlayer: Player = this.players[0]


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

  determineWhichFactionToBid(bids: Map<Faction, { value: number, player: Player }>, biddingPlayer: Player): Faction | undefined {
    let bidentries = Array.from(bids.entries())
    let alreadyLeading = bidentries.some(([_faction, { value, player }]) => player?.name === biddingPlayer.name)
    if (alreadyLeading) return undefined // stop bidding if already leading in at least 1 faction
    let bidDiff: [Faction, number][] = bidentries.map(([faction, { value, player }]) => [faction, (biddingPlayer.bids.get(faction) ?? 0) - value])
    console.log(bids)
    console.log(biddingPlayer)
    console.log(`diff = ${bidDiff}`)
    let b2 = bidDiff.filter(([faction, value]) => value != 0) // filter factions where I'm already at maxium bidding value
    console.log(`diff = ${b2}`)

    let max = b2.reduce((acc, [f, value]) => { return value > acc ? value : acc }, 0)
    let b3 = b2.filter(([faction, value]) => value === max)
    console.log(`diff = ${b3}`)
    let b4 = b3.filter(([faction, value]) => bids.get(faction)?.value != -1) // try filtering away all the factions without bets
    if (b4.length > 0) b3 = b4 // if after filtering there's still at least one valid faction, use the filtered group
    if (b3.length < 1) return undefined
    return randomArrayElement(b3)[0] // return a random faction from those eligible
  }

  placeBid(bids: Map<Faction, { value: number, player: Player }>, biddingPlayer: Player) {
    let factionToBid = this.determineWhichFactionToBid(bids, biddingPlayer)
    if (factionToBid) {
      let currentFaction = this.factions.get(factionToBid)!
      currentFaction.bid += 1
      currentFaction.player = biddingPlayer
    }
    this.turn += 1
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
