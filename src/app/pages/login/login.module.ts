import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AppComponent } from '../../app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzModule } from '../../shared/nz.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BrowserModule } from '@angular/platform-browser';
registerLocaleData(fr);

@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    NzGridModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NzModule,
    IconsProviderModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
})
export class LoginModule { }
