import { Injectable, EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skill: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  setSkill(skill) {
    this.skill.emit(skill);
  }
}
