import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutGamePageComponent } from './about-game-page/about-game-page.component';
import { AboutMePageComponent } from './about-me-page/about-me-page.component';
import { QuizGeneratorComponent } from './quiz-generator/quiz-generator.component';

const routes: Routes = [
  { path: '',   redirectTo: '/play', pathMatch: 'full' },
  {path: 'play', component: QuizGeneratorComponent},
  {path: 'aboutGame', component: AboutGamePageComponent},
  {path: 'aboutMe', component: AboutMePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
