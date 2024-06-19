import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { randInt } from './shared/utils';
import { Color, colorClass, randomDistinctColors } from './shared/models/color.enum';
import { factionData, factionsOfColor, randomFactions } from './shared/models/faction-data';
import { CommonModule } from '@angular/common';
import { Faction } from './shared/models/faction.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gaia-bidding';

  private playerCount: number = 3
  private readonly _factions: Faction[] = randomFactions(this.playerCount)

  colors = Color

  readonly players = [
    this.setupPlayer('Tim'),
    this.setupPlayer('John'),
    this.setupPlayer('Alice'),
  ]

  setupPlayer(name: string) {
    let bids = this._factions.map((v) => {
      return {
        faction: v,
        value: 0
      }
    })
    return { name, bids }
  }


  readonly factions = this._factions.map((v) => {
    let color = factionData.get(v)?.color
    return {
      name: v,
      bid: -1,
      player: undefined,
      color,
      colorClass: colorClass(color!),
    }
  })

  randInt() {
    console.log(randomDistinctColors(6))
    console.log(factionsOfColor(Color.Blue))
    console.log(randomFactions(3))
    return randInt(100)
  }

}
