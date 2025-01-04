import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard,IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonFab, IonFabButton,IonIcon,} from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonFab, IonFabButton, IonIcon, CommonModule],
})
// no fue necesario agregar las clases importadas porque Ionic si las reconoce, a diferencia con la clase Icons que si se necesitó añadirla en el constructor de la clase
export class Tab3Page {
  constructor() {

    addIcons({ cloudUploadOutline });
  }
}
