import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../app.module';
import {MatSnackBar} from '@angular/material/snack-bar';


const imageUrl = 'https://www.basketball-reference.com/req/202106291/images/players/';
const playerUrl = 'https://www.basketball-reference.com/players/';
const categories = ['3ptleaders.html', 'apgleaders.html', 'bpgleaders.html',
                    'fgleaders.html', 'minleaders.html', 'ppgleaders.html',
                    'rebpgleaders.html', 'spgleaders.html'];
const categoryNames = ['three pointers', 'assists per game', 'blocks per game',
                       'field goals made', 'minutes', 'points per game', 'rebounds per game', 'steals per game'];

@Component({
  selector: 'app-quiz-generator',
  templateUrl: './quiz-generator.component.html',
  styleUrls: ['./quiz-generator.component.css']
})
export class QuizGeneratorComponent implements OnInit {
  players : Player[] = [];
  highScore : number = 0;
  score : number = 0;
  message : string = "";
  currentCategory : string = "";

  constructor (private http : HttpClient, private _snackBar : MatSnackBar) {}

  ngOnInit() {
    // Generate Random Question
    const qSelector = Math.floor(Math.random() * categories.length);
    this.currentCategory = categoryNames[qSelector];
    this.generatePlayer(qSelector);
    this.generatePlayer(qSelector);
  }

  async generatePlayer(qSelector : number) {
    // Generate Random Year
    const year = Math.floor(Math.random() * (2022 - 1980) + 1980);
    // Carve out section of table with players from that year
    this.http.get('assets/' + categories[qSelector], { responseType: 'text'}).subscribe(data => {
      const tableStart = data.indexOf("<td>".concat(year.toString()));
      const table = data.substring(tableStart, tableStart + data.substring(tableStart).indexOf("</tr>")).split("<td>");
      // Select random row of player, but skip past first three info rows
      var rank = Math.floor(Math.random() * (table.length - 3)) + 3;
      // Advance to first player row in table
      var playerData = table[rank];
      while(playerData.includes('&nbsp')) {
        // Invalid Row; reroll
        rank = Math.floor(Math.random() * (table.length - 3)) + 3;
        playerData = table[rank];
      }
      playerData = playerData.substring(0, playerData.indexOf("</td>") + "</td>".length);

      // Current players have bolded names; delete <strong> for them
      playerData = playerData.replace("<strong>", "");
      playerData = playerData.replace("</strong>", "");
      const nameBegin = playerData.indexOf(".html\">") + ".html\">".length;

      // Add playerData to new player and push to player list
      this.players.push({
        name: playerData.substring(nameBegin, playerData.indexOf("</a>")),
        year : year.toString().concat("-".concat((year + 1).toString().substring(2))),
        imgUrl: imageUrl.concat(playerData.substring(playerData.indexOf("players") + "players/x/".length, playerData.indexOf(".html")) + ".jpg"),
        statVal: playerData.substring(playerData.indexOf("<span>(") + "<span>(".length, playerData.indexOf(")</span>"))
      })
    });
  }

  checkResult(playerNum : number) {
    const playerZeroStat = parseFloat(this.players[0].statVal);
    const playerOneStat = parseFloat(this.players[1].statVal);
    console.log(playerZeroStat);
    if (playerZeroStat == playerOneStat || 
        (playerZeroStat > playerOneStat && playerNum == 0) ||
        (playerOneStat > playerZeroStat && playerNum == 1)) {
      this.score++;
      this.message = "Correct!";
      if (this.score > this.highScore) this.highScore = this.score;
        }
    else {
      this.score = 0;
      this.message = "Incorrect!";
    }
    this.message += " " + this.players[0].name + " had " + this.players[0].statVal +
               " " + this.currentCategory + " and " + this.players[1].name + " had " + this.players[1].statVal + " " + 
               this.currentCategory + ".";
    this.openSnackBar();
    setTimeout(() => {
      console.log(this.message);
      this.players = [];
      this.message = "";
      this._snackBar.dismiss();
      this.ngOnInit();
    }, 2000);
  }

  openSnackBar() {
    this._snackBar.open(this.message);
  }
}