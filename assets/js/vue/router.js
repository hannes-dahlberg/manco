import VueRouter from 'vue-router'

//Index template
import index from './templates/index.vue'

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: index, name: 'index' }
    ]
})