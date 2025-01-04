import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent,      IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSelect, IonSelectOption, IonTextarea,IonButton,
  IonList, IonItem, IonLabel, } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ReactiveFormsModule } from '@angular/forms';   // Este un módulo que permite crear y gestionar formularios reactivos 
                                                        // permite la validación de campos
import { FormGroup, FormControl, Validators } from '@angular/forms';
 /* Importe el servicio */
import { ProviderService } from '../services/provider.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonSelect, IonSelectOption, IonTextarea,IonButton,
    IonList, IonItem, IonLabel,ReactiveFormsModule, CommonModule]
})

export class Tab2Page {


  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  });
         /* Arreglo con datos locales */
         dataList: any[] = [];
         collectionName = 'reviews';
  
       /* Inyecte la dependencia a Firestore */
      constructor(private providerService: ProviderService) {}
  
  
  onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
      this.myForm.reset()
  });
}
ngOnInit() {
  this.loadData();
}

loadData() {
  this.providerService.readCollection(this.collectionName).subscribe((data) => {
      this.dataList = data;
  });
}


}
