<template>
    <div>
        <h1 class="text-center" style="color: #eee">
            <span v-if="distance < 0">{{ name }}</span>
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
            <span v-if="weeks">
                ({{ weeks }}
                <span v-if="weeks == 1">vecka</span>
                <span v-else>veckor</span>)
            </span>
            <br />
            <span v-if="hours">{{ hours }}h</span>
            <span v-if="minutes">{{ minutes }}m</span>
            <span v-if="seconds">{{ seconds }}s</span>
        </h2>
    </div>
</template>
<script>
    export default {
        props: ['name', 'end'],
        data() {
            return {
                distance: null,
                years: null,
                months: null,
                days: null,
                weeks: null,
                hours: null,
                minutes: null,
                seconds: null,

            }
        },
        mounted() {
            this.end.setMinutes(this.end.getMinutes() + this.end.getTimezoneOffset())

            this.timer()
            setInterval(this.timer, 1000)
        },
        methods: {
            timer() {
                var now = new Date()
                var end = new Date(this.end)

                this.distance = end - now

                if (this.distance < 0) {
                    var diff = this.datediff(end, now)
                } else {
                    var diff = this.datediff(now, end)
                }

                this.years = diff.years
                this.months = diff.months
                this.days = diff.days
                this.weeks = diff.weeks
                this.hours = diff.hours
                this.minutes = diff.minutes
                this.seconds = diff.seconds
            },
            datediff(fromDate, toDate) {
                var returnObject = {
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate)
                }

                var leadingZero = function(value) {
                    if(value <= 9) {
                        return '0' + value
                    }

                    return value
                }

                var dateAsInt = function(date) {
                    return parseInt(date.getFullYear() + '' + leadingZero(date.getMonth()) + '' + leadingZero(date.getDate()) + '' + leadingZero(date.getHours()) + '' + leadingZero(date.getMinutes()) + '' + leadingZero(date.getSeconds()))
                }

                function daysInMonth(year, month) {
                    return new Date(year, month, 0).getDate()
                }

                var fromDateAsInt = dateAsInt(fromDate)
                var toDateAsInt = dateAsInt(toDate)


                returnObject.years = Math.floor((toDateAsInt / Math.pow(10, 10)) - (fromDateAsInt / Math.pow(10, 10)))

                //Remove year from date integer
                fromDateAsInt = fromDateAsInt - fromDate.getFullYear() * Math.pow(10, 10)
                toDateAsInt = toDateAsInt - toDate.getFullYear() * Math.pow(10, 10)

                returnObject.months = Math.floor((toDateAsInt / Math.pow(10, 8)) - (fromDateAsInt / Math.pow(10, 8)))
                if(returnObject.months < 0) {
                    returnObject.months = 12 + returnObject.months
                }
                returnObject.totalMonths = returnObject.years * 12 + returnObject.months

                //Remove month from date integer
                fromDateAsInt = fromDateAsInt - fromDate.getMonth() * Math.pow(10, 8)
                toDateAsInt = toDateAsInt - toDate.getMonth() * Math.pow(10, 8)

                returnObject.days = Math.floor((toDateAsInt / Math.pow(10, 6)) - (fromDateAsInt / Math.pow(10, 6)))
                if(returnObject.days < 0) {
                    var useYear = toDate.getFullYear()
                    var useMonth = toDate.getMonth()

                    if(useMonth == 1) {
                        useYear = useYear - 1
                        useMonth = 12
                    } else {
                        useMonth = useMonth - 1
                    }

                    returnObject.days = daysInMonth(useYear, useMonth) + returnObject.days
                }
                returnObject.totalDays = Math.floor((toDate - fromDate) / 1000 / 60 / 60 / 24)

                var oldToDate = new Date(toDate)
                toDate.setFullYear(fromDate.getFullYear())
                returnObject.weeks = Math.floor((toDate - fromDate) / 1000 / 60 / 60 / 24 / 7)
                returnObject.totalWeeks = Math.floor((returnObject.totalDays / 7))
                if(returnObject.weeks <= 0) {
                    returnObject.weeks = returnObject.totalWeeks
                }

                returnObject.totalHours = Math.floor((oldToDate - fromDate) / 60 / 60 / 1000)
                returnObject.totalMinutes = Math.floor((oldToDate - fromDate) / 60 / 1000)
                returnObject.totalSeconds = Math.floor((oldToDate - fromDate) / 1000)



                //Setting to and from to the same date
                oldToDate.setFullYear(fromDate.getFullYear())
                oldToDate.setMonth(fromDate.getMonth())
                oldToDate.setDate(fromDate.getDate())

                returnObject.hours = Math.floor((oldToDate - fromDate) / 60 / 60 / 1000)
                if(returnObject.hours < 0) {
                    returnObject.hours = 24 + returnObject.hours
                }

                returnObject.minutes = Math.floor((oldToDate - fromDate) / 60 / 1000)
                if(returnObject.minutes < 0) {
                    returnObject.minutes = 24 * 60 + returnObject.minutes
                }
                returnObject.minutes = returnObject.minutes - (returnObject.hours * 60)

                returnObject.seconds = Math.floor((oldToDate - fromDate) / 1000)
                if(returnObject.seconds < 0) {
                    returnObject.seconds = 24 * 60 * 60 + returnObject.seconds
                }

                returnObject.seconds = returnObject.seconds - (returnObject.minutes * 60) - (returnObject.hours * 60 * 60)


                return {
                    fromDate: returnObject.fromDate,
                    toDate: returnObject.toDate,
                    years: returnObject.years,
                    months: returnObject.months,
                    days: returnObject.days,
                    hours: returnObject.hours,
                    minutes: returnObject.minutes,
                    seconds: returnObject.seconds,
                    weeks: returnObject.weeks,
                    totalMonths: returnObject.totalMonths,
                    totalDays: returnObject.totalDays,
                    totalHours: returnObject.totalHours,
                    totalMinutes: returnObject.totalMinutes,
                    totalSeconds: returnObject.totalSeconds,
                    totalWeeks: returnObject.totalWeeks
                }
            }
        }
    }
</script>