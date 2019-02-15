<template>
  <div>
    <div class="container mt-5">
      <timerComponent name="Lukas" date="2018-03-25 04:08"></timerComponent>
      <timerComponent name="Alice" date="2016-06-20 18:29"></timerComponent>
    </div>
    <footer class="footer">
      <div class="container">
        <p class="text-muted">
          Utvecklad av
          <a href="mailto:hannes@dwik.se">Hannes</a>
        </p>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TimerComponent from "./timer.component.vue";

@Component({
  components: { TimerComponent }
})
export default class IndexComponent extends Vue {
  public mounted() {}
}
</script>