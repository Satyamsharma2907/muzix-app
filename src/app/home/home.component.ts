import { Component } from '@angular/core';
import { Carousel } from '../models/carousel';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides: Carousel[] = [
    { url: 'https://image.tmdb.org/t/p/original/eN6R6mb3ntHwA3y3MhSwpP78ljN.jpg', title: 'Luther: The Fallen Sun' },
    { url: 'https://image.tmdb.org/t/p/original/gslT8t964rYXyqRcqrxFh77ikyb.jpg', title: 'Ant-Man and the Wasp: Quantumania' },
    { url: 'https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg', title: 'Black Panther: Wakanda Forever' },
    { url: 'https://image.tmdb.org/t/p/original/v2LilmCylr3bL9TCZSj6syjowZh.jpg', title: 'A Man Called Otto' },
    { url: 'https://image.tmdb.org/t/p/original/4DeIeFiFwHnScQ0pxqgsyg3Fafq.jpg', title: 'Scream VI' },
    { url: 'https://image.tmdb.org/t/p/original/tt79dbOPd9Z9ykEOpvckttgYXwH.jpg', title: 'Everything Everywhere All at Once' },
  ];

  constructor(public userService: UserService) {}

}
