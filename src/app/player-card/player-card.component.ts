import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../app.module';


@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent {
  @Input('player')
  player!: Player;
  }

