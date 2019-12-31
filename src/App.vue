<template>
	<div id="app" class="flex flex-col h-screen w-screen justify-center items-center text-center">
		<h1 class="text-4xl md:text-5xl uppercase font-bold px-4">Destiny Reset Clock</h1>
		<h2 class="text-2xl md:text-4xl uppercase px-4 mt-4">Next Weekly Reset</h2>
		<Ticker :secondsToReset="secondsToReset" class="mt-8 max-w-3xl mx-auto" />
		<p class="mt-8 uppercase font-bold">
			{{ nextUTCReset.local().format('MMMM DD, YYYY h:mm A') }}
			<br />
			{{ localTimezone }}
		</p>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

import Ticker from '@/components/Ticker'

const WEEKLY_RESET_DAY = 2 // Tuesday
const RESET_HOUR = 17 // 5PM UTC

export default {
	name: 'app',
	components: {
		Ticker
	},
	data() {
		return {
			now: dayjs(),
			nowUTC: dayjs.utc(),
			interval: () => {
				setInterval(() => {
					this.now = dayjs()
					this.nowUTC = dayjs.utc()
				}, 1000)
			},
			localTimezone: `${new Date()}`.match(/\((.+)\)$/)[1]
		}
	},
	mounted() {
		this.interval()
	},
	computed: {
		formattedNow() {
			return this.now.format('MMMM DD, YYYY h:mm:ss A Z')
		},
		formattedUTCNow() {
			return this.nowUTC.format('MMMM DD, YYYY h:mm:ss A Z')
		},
		nextUTCReset() {
			let nextUTCReset = dayjs
				.utc()
				.day(WEEKLY_RESET_DAY)
				.hour(RESET_HOUR)
				.minute(0)
				.second(0)

			if (this.nowUTC.isAfter(nextUTCReset)) {
				nextUTCReset = nextUTCReset.add(1, 'week')
			}

			return nextUTCReset
		},
		secondsToReset() {
			return Math.floor(this.nextUTCReset.diff(this.nowUTC) / 1000)
		},
		isTuesday() {
			return this.now.day() === 2
		}
	}
}
</script>
