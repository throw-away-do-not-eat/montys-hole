import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'N-ДВЕРНЫЙ МОНТИХОЛ';

  constructor() {
    console.log(
      'О, ты любознательный малый, и пошёл проверить консоль. ' +
        'Здесь я подсказываю за какой дверью (считая с нуля, яжпрограммист) находится кошкодевка, ' +
        'чтобы сомневающиеся могли проверить что я не перемещаю её между дверями'
    );
  }
}
