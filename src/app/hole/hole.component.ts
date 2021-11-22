import { Component, OnInit } from '@angular/core';

interface Door {
  win: boolean;
  opened: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-hole',
  templateUrl: './hole.component.html',
  styleUrls: ['./hole.component.scss'],
})
export class HoleComponent implements OnInit {
  analRapes = 0;
  catGirls = 0;
  lastWin = false;

  doorNumber = 1000;

  doors = this.generateDoors();

  stage: 'first' | 'second' | 'reveal' = 'first';

  constructor() {}

  ngOnInit() {}

  nextStage(door: Door) {
    if (door.opened) {
      return;
    }
    switch (this.stage) {
      case 'first':
        door.selected = true;
        const doorsToOpen = this.doors.filter(
          ({ selected, win }) => !selected && !win
        );
        doorsToOpen.forEach((door) => (door.opened = true));
        if (doorsToOpen.length === this.doorNumber - 1) {
          // Упс, игрок сразу попал на приз и мы открыли лишка дверей
          // А по условию одну ведущий должен оставить закрытой
          doorsToOpen[HoleComponent.genInt(doorsToOpen.length)].opened = false;
        }
        this.stage = 'second';
        break;
      case 'second':
        door.opened = true;
        if (door.win) {
          this.catGirls++;
          this.lastWin = true;
        } else {
          this.analRapes++;
          this.lastWin = false;
        }
        this.doors
          .filter(({ opened }) => !opened)
          .forEach((door) => (door.opened = true));
        this.stage = 'reveal';
    }
  }

  setDoors(d: number) {
    this.doorNumber = d;
    this.reset();
  }

  reset() {
    this.doors = this.generateDoors();
    this.stage = 'first';
  }

  private generateDoors(): Door[] {
    const doors: Door[] = [];
    const catGirl = HoleComponent.genInt(this.doorNumber); // 0 - this.doorNumber
    console.log(`Кошкодевка за дверью ${catGirl}`);
    for (let i = 0; i < this.doorNumber; i++) {
      doors.push({ win: i === catGirl, selected: false, opened: false });
    }
    return doors;
  }

  private static genInt(max: number) {
    // [0..max-1]
    return Math.floor(Math.random() * max);
  }
}
