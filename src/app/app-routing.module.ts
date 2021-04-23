import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { CartComponent} from './components/cart/cart.component';
import { BookDisplayComponent } from './components/book-display/book-display.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent, pathMatch: 'full', },
  {
  path: 'dashboard', component: DashboardComponent,
  children:[
    {path: 'cart', component: CartComponent},
    {path: 'books', component: BookDisplayComponent},
    {path: '', component: BookDisplayComponent},
    {path: 'order', component: OrderComponent}
  ]
  },
  {
  path: '', component: DashboardComponent,children:[
    {path: '', component: BookDisplayComponent},
    {path: 'cart', component: CartComponent},
    {path: 'books', component: BookDisplayComponent},
    {path: 'order', component: OrderComponent}
  ]
  },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
