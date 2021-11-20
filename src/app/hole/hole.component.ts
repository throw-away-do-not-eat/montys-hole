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

  doors = HoleComponent.generateDoors();

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
        this.doors
          .filter(({ selected, win }) => !selected && !win)
          .forEach((door) => (door.opened = true));
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

  reset() {
    this.doors = HoleComponent.generateDoors();
    this.stage = 'first';
  }

  private static generateDoors(): Door[] {
    const doors: Door[] = [];
    const catGirl = Math.floor(Math.random() * 1000); // 0 - 999
    for (let i = 0; i < 1000; i++) {
      doors.push({ win: i === catGirl, selected: false, opened: false });
    }
    return doors;
  }
}
