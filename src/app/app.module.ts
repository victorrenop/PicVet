import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { BaseRestService } from '../providers/base-rest-service';
import { LoginService } from '../providers/login-service';

import { ListOfPetsPageModule } from '../pages/list-of-pets/list-of-pets.module';
import { LoginPageModule } from '../pages/login/login.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { HomePageModule } from '../pages/home/home.module';
import { PetProfilePageModule } from '../pages/pet-profile/pet-profile.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { SearchPageModule } from '../pages/search/search.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { BookModule } from '../pages/book/book.module';
import { LogModule } from '../pages/log/log.module';

import { Geolocation } from '@ionic-native/geolocation';

//import { Push } from '@ionic-native/push';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ListOfPetsPageModule,
    LoginPageModule,
    MenuPageModule,
    PetProfilePageModule,
    RegisterPageModule,
    SearchPageModule,
    UserProfilePageModule,
    BookModule,
    LogModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BaseRestService,
    LoginService,
   // Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
