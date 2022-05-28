import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResidentComponent} from "./resident.component";
import {RouterModule} from "@angular/router";
import {
  ResidentModificationHandicapComponent
} from "./resident-modification-handicap/resident-modification-handicap.component";
import { ResidentHandicapComponent } from './resident-handicap/resident-handicap.component';
import { ResidentCreationHandicapComponent } from './resident-creation-handicap/resident-creation-handicap.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import {ResidentGraphStatsComponent} from "./resident-graph-stats/resident-graph-stats.component";
import {ResidentChartsComponent} from "./resident-graph-stats/resident-charts/resident-charts.component";

@NgModule({
  declarations: [
    ResidentComponent,
    ResidentModificationHandicapComponent,
    ResidentHandicapComponent,
    ResidentCreationHandicapComponent,
    HeatmapComponent,
    ResidentGraphStatsComponent,
    ResidentChartsComponent
  ],
    exports: [
        ResidentModificationHandicapComponent,
        ResidentCreationHandicapComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ResidentModule { }
