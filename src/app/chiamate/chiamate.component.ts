import { Component } from '@angular/core';

@Component({
  selector: 'app-chiamate',
  templateUrl: './chiamate.component.html',
  styleUrls: ['./chiamate.component.css']
})
export class ChiamateComponent {
  title = 'Chiamate';

  async getData() {
    const response = await fetch("http://localhost:8888/api/getData");
    const data = await response.json();
    console.log(data);
  }

  async getPlayerTeam(){
    let teamInput = (<HTMLInputElement>document.getElementById('txtTeam')).value;
    const response = await fetch('http://localhost:8888/api/getPlayerTeam',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({team: teamInput})
    });
    const data = await response.json();
    console.log(data);
  }

  async insertPlayer(){
    let nameInput = (<HTMLInputElement>document.getElementById('txtPlayerName')).value;
    let teamInput = (<HTMLInputElement>document.getElementById('txtPlayerTeam')).value;
    let IdInput = (<HTMLInputElement>document.getElementById('txtPlayerId')).value;
    let puntiInput = (<HTMLInputElement>document.getElementById('txtPlayerPunti')).value;
    let etaInput = (<HTMLInputElement>document.getElementById('txtPlayerEta')).value;
    let confInput = (<HTMLInputElement>document.getElementById('txtPlayerConference')).value;
    let ruoloInput = (<HTMLInputElement>document.getElementById('txtPlayerRuolo')).value;
    const response = await fetch('http://localhost:8888/api/insertPlayer',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: nameInput, team: teamInput, id: IdInput, punti: puntiInput, eta: etaInput, conference: confInput, ruolo: [ruoloInput]})
    });
    const data = await response.json();
    console.log(data);
  }

  async updatePlayer(){
    let nameInput = (<HTMLInputElement>document.getElementById('txtPlayerName')).value;
    let teamInput = (<HTMLInputElement>document.getElementById('txtPlayerTeam')).value;
    let puntiInput = (<HTMLInputElement>document.getElementById('txtPlayerPunti')).value;
    let confInput = (<HTMLInputElement>document.getElementById('txtPlayerConference')).value;
    const response = await fetch('http://localhost:8888/api/updatePlayer',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: nameInput, team: teamInput, punti: puntiInput, conference: confInput})
    });
    const data = await response.json();
    console.log(data);
  }

  async statTeam(){
    const response = await fetch('http://localhost:8888/api/statTeam',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    const data = await response.json();
    console.log(data);
  }
}
