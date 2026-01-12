
import { Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { DobotComponent } from '../dobot/dobot.component';
import { SerialComponent } from '../serial/serial.component';
import { ConfigComponent } from '../config/config.component';

export const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{ path: '', redirectTo: 'dobot', pathMatch: 'full' },
			{ path: 'dobot', component: DobotComponent },
			{ path: 'heater', component: SerialComponent },
			{ path: 'config', component: ConfigComponent },
		]
	}
];
