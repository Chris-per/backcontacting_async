import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainComponent } from "../main/main.component";
import { HttpClientModule } from '@angular/common/http';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'backcontacting_async';
  constructor(private communication: CommunicationService) {}

  ngOnInit() {
    // Open the WebSocket connection once at the root
    this.communication.openDataStream().subscribe();
  }
}
