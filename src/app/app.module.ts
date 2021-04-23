import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BookDisplayComponent } from './components/book-display/book-display.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IgxBottomNavModule } from 'igniteui-angular';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { JwPaginationModule } from 'jw-angular-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CartComponent } from './components/cart/cart.component';
import {MatRadioModule} from '@angular/material/radio';
import { OrderComponent } from './components/order/order.component';
import { JwPaginationComponent } from './components/jw-pagination/jw-pagination.component';
import { LoginComponent } from './components/login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookDisplayComponent,
    CartComponent,
    OrderComponent,  
    JwPaginationComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,  
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    IgxBottomNavModule,
    MatButtonToggleModule,
    JwPaginationModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
