import { Component, OnInit } from '@angular/core';

import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skill;
  options;
  constructor(private skillService: SkillService) {
  }

  ngOnInit() {
    this.skillService.skill.subscribe(value => {
      this.skill = value.sort((a, b) => {
        return b.count - a.count;
      }).map(item => (
        {
          name: item.skill,
          value: item.count
        }
      ));

      this.options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: 'Counters',
            type: 'pie',
            center: ['50%', '50%'],
            data: this.skill,


            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]

      };
    });
  }
}
