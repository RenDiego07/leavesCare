import { Component,  signal, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton,IonIcon, IonCard, IonCardContent,  IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonButton} from '@ionic/angular/standalone';
import { cloudUploadOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeachablemachineService } from '../services/teachablemachine.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton, IonIcon, IonCard, IonCardContent, ReactiveFormsModule, IonSelect, IonSelectOption,IonList, IonItem, IonLabel, IonButton],
  providers: [TeachablemachineService] 
})
export class Tab4Page {


  imageReady = signal(false)

  imageUrl = signal("")
   /* Declare la referencia al elemento con el id image */
   @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;
  selected_value = signal<string | null>(null);  // estado inicial del select

     /* Lista de predicciones */
     predictions: any[] = [];

     /* Declare los atributos para almacenar el modelo y la lista de clases */
     modelLoaded = signal(false);
     classLabels: string[] = [];


  constructor(private teachablemachine: TeachablemachineService) {
      addIcons({ cloudUploadOutline });
   }
   
   myForm: FormGroup = new FormGroup({
      type: new FormControl("", Validators.required)
   })

  async changeValue(event: CustomEvent){
    const value = (event.target as HTMLIonSelectElement).value
    console.log(value)
    this.selected_value.set(value);

    if (value) {
      try {
        await this.teachablemachine.loadModel2(value); // Carga el modelo correspondiente
        this.classLabels = this.teachablemachine.getClassLabels();
        this.modelLoaded.set(true);
        console.log(`Modelo de ${value} cargado correctamente.`);
      } catch (error) {
        console.error(`Error al cargar el modelo de ${value}:`, error);
      }
    }else{
      console.log("no cargaaa")
    }
  }

  performAction() {
    if(this.selected_value()){
      const user_value = this.selected_value()
      alert(`it works ${user_value}`)
    }

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
           // console.log(reader.result as string)
        };

        reader.readAsDataURL(file); // Leer el archivo como base64
    }
}
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


