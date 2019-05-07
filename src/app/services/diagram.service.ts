import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DiagramService {
  constructor(private http: Http) {
  }

  getTemperature() {
    return this.http.get('http://localhost:3000/temperatures').map(res => res.json());
  }

  getPrecipitation() {
    return this.http.get('http://localhost:3000/precipitation').map(res => res.json());
  }
}
