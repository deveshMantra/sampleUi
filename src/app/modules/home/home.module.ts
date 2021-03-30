import { ToastComponent } from './../../components/toast/toast.component';
import { FooterComponent } from './../../components/footer/footer.component';
import { HeaderComponent } from './../../components/header/header.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './store/home.reducer';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, HomePageComponent, ToastComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule,
    StoreModule.forFeature('homeReducer', homeReducer),
  ]
})
export class HomeModule { }
