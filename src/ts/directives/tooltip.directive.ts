import { DirectiveFunction, VNode } from "vue";
import { DirectiveBinding, DirectiveOptions } from "vue/types/options";

export const tooltipDirective: DirectiveOptions = {
  bind: (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) => {
    $(el).tooltip(binding.value);
  },
  update: (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) => {
    $(el)
      .attr('data-original-title', $(el).attr('title'))
      .tooltip('update');
  },
};