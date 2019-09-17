import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
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
        const chart = am4core.create('pie-chart', am4charts.PieChart);
        const pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'count';
        pieSeries.dataFields.category = 'skill';

        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(30);

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color('#fff');
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template
          // change the cursor on hover to make it apparent the object can be interacted with
          .cursorOverStyle = [
            {
              'property': 'cursor',
              'value': 'pointer'
            }
          ];

        // Create a base filter effect (as if it's not there) for the hover to return to
        const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
        shadow.opacity = 0;

        // Create hover state
        // normally we have to create the hover state, in this case it already exists
        const hoverState = pieSeries.slices.template.states.getKey('hover');

        // Slightly shift the shadow and make it more prominent on hover
        const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
        hoverShadow.opacity = 0.7;
        hoverShadow.blur = 5;

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = 'right';
        chart.data = this.skill;

        const title = chart.titles.create();
        title.text = null;

    });
  }
}
