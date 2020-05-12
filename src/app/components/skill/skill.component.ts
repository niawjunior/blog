import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skill;
  constructor(private skillService: SkillService) {
  }

  ngOnInit() {
    this.skillService.skill.subscribe(value => {
      this.skill = value.sort((a, b) => {
        return b.count - a.count;
      });
    });
  }
}
