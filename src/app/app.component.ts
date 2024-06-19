import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { randInt } from './shared/utils';
import { Color, randomDistinctColors } from './shared/models/color.enum';
import { factionsOfColor, randomFactions } from './shared/models/faction-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gaia-bidding';

  randInt() {
    console.log(randomDistinctColors(6))
    console.log(factionsOfColor(Color.Blue))
    console.log(randomFactions(3))
    return randInt(100)
  }

}
