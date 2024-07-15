import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'recepies', pathMatch:'full'},
  {path:'recepies', loadChildren: ()=> import('./recepies/recepies.module').then(m =>m.RecepiesModule)},
  {path: 'shopping-list', loadChildren: ()=> import('./shopping-list/shopping-list.module').then(m =>m.ShoppingListModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
