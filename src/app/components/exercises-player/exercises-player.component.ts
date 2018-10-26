import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material';


class Exercise {
  constructor(
    name: string = 'The Exercise',
    imgUrl: string = '';
  ) {}
}

const exercises: Exercise[] = [
  new Exercise(),
  new Exercise(),
  new Exercise()
];

@Component({
  selector: 'mh-exercises-player',
  templateUrl: './exercises-player.component.html',
  styleUrls: ['./exercises-player.component.scss']
})
export class ExercisesPlayerComponent implements OnInit {
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  steps: Exercise[] = exercises;
  currentStep: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  next() {
    const len = this.steps.length - 1;
    if(++this.currentStep > len) this.currentStep = len;
  }

  stepChanged() {
  }

}