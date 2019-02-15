import * as bootstrap from "bootstrap";
import $ from "jquery";
import popper from "popper.js";
(window as any).$ = $;
(window as any).popper = popper;
(window as any).bootstrap = bootstrap;

// VueJS
import Vue from "vue";

// Index component
import IndexComponent from "./components/index.component.vue";
import { tooltipDirective } from "./directives/tooltip.directive";

Vue.directive("tooltip", tooltipDirective);

const vue = new Vue({
  el: "#app",
  // store,
  render: (h) => h(IndexComponent),
});
