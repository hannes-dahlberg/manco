<template>
  <div>
    <h1 class="text-center" style="color: #eee">
      <span v-if="now > end">{{ name }}</span>
      <span v-else>Nedräkning</span>
    </h1>
    <h2 class="text-center">
      <span v-if="years">{{ years }} år</span>
      <span v-if="months">
        {{ months }}
        <span v-if="months == 1">månad</span>
        <span v-else>månader</span>
      </span>
      <span v-if="days">
        {{ days }}
        <span v-if="days == 1">dag</span>
        <span v-else>dagar</span>
      </span>
      <span v-if="totalWeeks">
        ({{ totalWeeks }}
        <span v-if="totalWeeks == 1">vecka</span>
        <span v-else>veckor</span>)
      </span>
      <br>
      <span v-if="hours">{{ hours }}h</span>
      <span v-if="minutes">{{ minutes }}m</span>
      <span v-if="seconds">{{ seconds }}s</span>
    </h2>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import moment, { unitOfTime } from "moment";
import { setInterval } from "timers";

@Component
export default class TimerComponent extends Vue {
  @Prop(String) name: string;
  @Prop(String) date: string;

  public end: moment.Moment = moment();
  public now: moment.Moment = moment();

  public years: number = 0;
  public months: number = 0;
  public totalMonths: number = 0;
  public days: number = 0;
  public totalDays: number = 0;
  public hours: number = 0;
  public totalHours: number = 0;
  public minutes: number = 0;
  public totalMinutes: number = 0;
  public seconds: number = 0;
  public totalSeconds: number = 0;

  public totalWeeks: number = 0;

  public mounted() {
    this.end = moment(this.date);
    this.update();
    setInterval(() => this.update(), 1000);
  }

  public update() {
    this.now = moment();

    this.years = this.getDiff("years");
    this.months = this.getDiff("months", 12);
    this.totalMonths = this.getDiff("months");

    if (this.now > this.end) {
      this.days = Math.floor(
        this.now.diff(
          moment(this.end)
            .year(this.now.year())
            .month(this.now.month() - 1),
          "days"
        )
      );
    } else {
      this.days = Math.floor(
        moment(this.end)
          .year(this.now.year())
          .month(this.now.month())
          .diff(this.now, "days")
      );
    }
    this.totalDays = this.getDiff("days");
    this.hours = this.getDiff("hours", 24);
    this.totalHours = this.getDiff("hours");
    this.minutes = this.getDiff("minutes", 60);
    this.totalMinutes = this.getDiff("minutes");
    this.seconds = this.getDiff("seconds", 60);
    this.totalSeconds = this.getDiff("seconds");

    this.totalDays = this.getDiff("weeks");
  }

  public getDiff(diffType: unitOfTime.Diff, left?: number): number {
    let diff: number;
    if (this.now > this.end) {
      diff = this.now.diff(this.end, diffType);
    } else {
      diff = this.end.diff(this.now, diffType);
    }
    return left === undefined ? Math.floor(diff) : diff % left;
  }
}
</script>