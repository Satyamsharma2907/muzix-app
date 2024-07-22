import { AfterContentInit, Component, Input } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'muzix-app';
  color: string = '#fff';
  @Input()
  imageName1: any = '';

  constructor(public userService: UserService) {}

  ngAfterContentInit(): void {
    this.userService.imageNameEmitter.subscribe(() => {
      this.imageName1 = this.userService.imageName as any;
    });
    this.userService.chosenPlanColorEmitter.subscribe(() => {
      this.color = this.userService.chosenPlanColor;
    });
  }
}
