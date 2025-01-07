import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachablemachineService {
  private URL = "https://teachablemachine.withgoogle.com/models/KkUPKNR_o/"
  private model: any;
  private classLabels: string[] = [];
  
  private models: Record<string, string> = {
    "Potato": "https://teachablemachine.withgoogle.com/models/xceT2tp-C/",
    "Apple": "https://teachablemachine.withgoogle.com/models/vdpSMS18N/",
    "Grape": "https://teachablemachine.withgoogle.com/models/g8jruckgS/"
  };

  constructor() { }


      async loadModel() {
        try {
            const modelURL = this.URL + 'model.json';
            const metadataURL = this.URL + 'metadata.json';

            const tmImage = (window as any).tmImage;
            this.model = await tmImage.load(modelURL, metadataURL);
            this.classLabels = this.model.getClassLabels();

        } catch (error) {
            console.error('Error al cargar el modelo:', error);
            throw new Error('No se pudo cargar el modelo.');
        }
    }

    async loadModel2(value:string) {
        try {
            if (!this.models[value]) {
                throw new Error(`No se encontró un modelo para la opción: ${value}`);
            }
            const modelURL = this.models[value] + 'model.json';
            const metadataURL = this.models[value] + 'metadata.json';

            const tmImage = (window as any).tmImage;
            this.model = await tmImage.load(modelURL, metadataURL);
            this.classLabels = this.model.getClassLabels();

        } catch (error) {
            console.error('Error al cargar el modelo:', error);
            throw new Error('No se pudo cargar el modelo.');
        }
    }

    getClassLabels(): string[] {
        return this.classLabels;
    }

        /* Método para la predicción a partir de la imagen */
        async predict(imageElement: HTMLImageElement): Promise<any[]> {

          if (!this.model) {
              throw new Error('El modelo no está cargado.');
          }

          return await this.model.predict(imageElement);
      }



}
