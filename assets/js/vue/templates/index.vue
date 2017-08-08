<template>
    <div>
        <div class="container">
            <timer :name="alice.name" :end="alice.end"></timer>
            <timer :name="kokos.name" :end="kokos.end"></timer>
        </div>
        <footer class="footer">
            <div class="container">
                <p class="text-muted">Utvecklad av <a href="mailto:hannes@dwik.se">Hannes</a></p>
            </div>
        </footer>
    </div>
</template>
<script>
    import timer from './components/timer.vue'
    export default {
        components: { timer },
        data() {
            return {
                alice: {
                    name: 'Alice',
                    end: new Date('2016-06-20T18:29:00')
                },
                kokos: {
                    name: 'Kokos',
                    end: new Date('2018-03-23T00:00:00')
                }
            }
        }
    }
</script>