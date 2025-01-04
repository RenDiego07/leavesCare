import { Component, signal, ViewChild, ElementRef} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,  IonFab, IonFabButton, IonIcon, IonCard,   IonCardContent, IonButton, IonList, IonItem, IonLabel,} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';
import { TeachablemachineService } from '../services/teachablemachine.service';
import { CommonModule } from '@angular/common';

/* Importe el pipe */
import { PercentPipe } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,CommonModule,IonFab, IonFabButton, IonIcon, IonCard, IonCardContent, IonButton, IonList,PercentPipe ,IonItem, IonLabel,],
})
export class Tab1Page {

  imageReady = signal(false)
  imageUrl = signal("")

 /* Declare la referencia al elemento con el id image */
 @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

     /* Lista de predicciones */
  		predictions: any[] = [];

    /* Declare los atributos para almacenar el modelo y la lista de clases */
    modelLoaded = signal(false);
    classLabels: string[] = [];
    /* Registre el servicio en el constructor */
  constructor(private teachablemachine: TeachablemachineService) {
    addIcons({ cloudUploadOutline });

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];
   
        const reader = new FileReader();

        // Convertir el archivo a una URL base64 para mostrarlo en el html
        reader.onload = () => {
          this.imageUrl.set(reader.result as string)
          this.imageReady.set(true)
            console.log(reader.result as string)
        };

        reader.readAsDataURL(file); // Leer el archivo como base64
    }
}
 /* Método ngOnInit para cargar el modelo y las clases */
  async ngOnInit() {
    await this.teachablemachine.loadModel()
    this.classLabels = this.teachablemachine.getClassLabels()
    this.modelLoaded.set(true)
  }

      /* Método para obtener la predicción a partir de la imagen */
      async predict() {
        try {
            const image = this.imageElement.nativeElement;
            this.predictions = await this.teachablemachine.predict(image);
        } catch (error) {
            console.error(error);
            alert('Error al realizar la predicción.');
        }
    }


}
