import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { TrialComponent } from './trial/trial.component'
import { AddGameComponent } from './add-game/add-game.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { AvatarChangeComponent } from './avatar-change/avatar-change.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule} from '@angular/material'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { SearchfilterPipe } from './searchfilter.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './CartService/cart.service';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { OrderProceedComponent } from './order-proceed/order-proceed.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
        FetchDataComponent,
        AddGameComponent,
        TrialComponent,
        UserRegistrationComponent,
        GameDetailComponent,
        UserloginComponent,
        SearchfilterPipe,
        AvatarChangeComponent,
        CommentFormComponent,
        CommentComponent,
        CartItemsComponent,
        OrderProceedComponent

  ],
    imports: [
      CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      HttpClientModule,
    MatDialogModule,
        FormsModule,
      MatTreeModule,
        MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule, CommonModule,
      MatTableModule,
      MatSortModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatSelectModule,
      MatRadioModule,
      MatButtonModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatButtonToggleModule,
        MatBadgeModule,
    RouterModule.forRoot([
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'games/add', component: AddGameComponent },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'trial', component: TrialComponent },
        { path: 'games/:id', component: GameDetailComponent },
        { path: 'register', component: UserRegistrationComponent },
        { path: 'login', component: UserloginComponent },
        { path: 'avatar', component: AvatarChangeComponent },
        { path: 'cart', component: CartItemsComponent },
        { path: 'proceed', component: OrderProceedComponent}


    ]),
    BrowserAnimationsModule
  ],
  providers: [CartService],
    bootstrap: [AppComponent],
  entryComponents: [AddGameComponent]
})
export class AppModule { }
