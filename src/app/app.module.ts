import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { LoginService } from '../providers/login-service';
import { ProfileService } from '../providers/profile-service';
import { PetService } from '../providers/pet-service';

import { ManagePetPageModule } from '../pages/manage-pet/managepet.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { HomePageModule } from '../pages/home/home.module';
import { PetProfilePageModule } from '../pages/pet-profile/pet-profile.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { SearchPageModule } from '../pages/search/search.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { RegisterService } from '../providers/register-service';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';

console.log(ManagePetPageModule);

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ManagePetPageModule,
    LoginPageModule,
    MenuPageModule,
    PetProfilePageModule,
    RegisterPageModule,
    SearchPageModule,
    UserProfilePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    ProfileService,
    PetService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RegisterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
