import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public apiUrl = environment.apiUrl;
  public apiToken = environment.apiToken;
}
