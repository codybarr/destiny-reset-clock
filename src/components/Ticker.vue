<template>
	<time class="ticker" datetime="P01DT22H06M12S">
		<div class="days tile">{{ days }}</div>
		<div class="days-separator separator">:</div>
		<div class="hours tile">{{ hours }}</div>
		<div class="hours-separator separator">:</div>
		<div class="minutes tile">{{ minutes }}</div>
		<div class="minutes-separator separator">:</div>
		<div class="seconds tile">{{ seconds }}</div>
		<div class="days-label label">DAYS</div>
		<div class="hours-label label">HOURS</div>
		<div class="minutes-label label">MINUTES</div>
		<div class="seconds-label label">SECONDS</div>
	</time>
</template>

<script>
const SECONDS_IN_DAY = 86400 // 60 * 60 * 24
const SECONDS_IN_HOUR = 3600 // 60 * 60

export default {
	name: 'Ticker',
	props: ['secondsToReset'],
	computed: {
		days() {
			return Math.floor(this.secondsToReset / SECONDS_IN_DAY)
				.toString()
				.padStart(2, '0')
		},
		hours() {
			return Math.floor(
				(this.secondsToReset % SECONDS_IN_DAY) / SECONDS_IN_HOUR
			)
				.toString()
				.padStart(2, '0')
		},
		minutes() {
			return Math.floor((this.secondsToReset % SECONDS_IN_HOUR) / 60)
				.toString()
				.padStart(2, '0')
		},
		seconds() {
			return Math.floor(this.secondsToReset % 60)
				.toString()
				.padStart(2, '0')
		}
	}
}
</script>

<style lang="postcss" scoped>
.ticker {
	@apply w-full;
	display: grid;
	grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
	grid-template-rows: 1fr auto;
	grid-template-areas:
		'days days-separator hours hours-separator minutes minutes-separator seconds'
		'days-label . hours-label . minutes-label . seconds-label';
}

.tile {
	@apply text-2xl font-bold border border-2 border-green-500 bg-gray-600 text-white rounded-lg w-16 h-16 flex justify-center items-center mx-auto;
}

.separator {
	@apply flex justify-center items-center text-2xl font-bold;
}

.label {
	@apply mt-4 text-sm;
}

.days {
	grid-area: days;
}

.days-separator {
	grid-area: days-separator;
}

.hours {
	grid-area: hours;
}

.hours-separator {
	grid-area: hours-separator;
}

.minutes {
	grid-area: minutes;
}

.minutes-separator {
	grid-area: minutes-separator;
}

.seconds {
	grid-area: seconds;
}

.days-label {
	grid-area: days-label;
}

.hours-label {
	grid-area: hours-label;
}

.minutes-label {
	grid-area: minutes-label;
}

.seconds-label {
	grid-area: seconds-label;
}
</style>
