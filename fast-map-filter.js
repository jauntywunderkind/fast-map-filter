/**
 * A special symbol returned by map functions to filter the current element.
 */
export const NO_ENTRY = Symbol.for("fast-map-filter:no-entry")

/**
 * All functions are assumed to be Map calls, unless wrapped in `Filter`.
 */
export function Filter(fn) {
	return function filtered(el, i, arr) {
		const value = fn(el, i, arr)
		return value ? el : NO_ENTRY
	}
}

/**
 * Speed-optimized/single-pass single-pass way to run an arbitrary of map/filter calls.
 */
export function fastMapFilter(arr, ...fns) {
	// pre-init same sized output
	const output = new Array(arr.length)

	let pos = 0
	elLoop: for (let i in arr) {
		let el = arr[i]

		// run each fn
		for (let fn of fns) {
			el = fn(el, i, arr)
			if (el === NO_ENTRY) {
				continue elLoop
			}
		}

		output[pos++] = el
	}

	// trim output to final size
	return output.slice(0, pos)
}
export default fastMapFilter

/**
 * Speed-optimized/single-pass single-pass way to run an arbitrary of map/filter calls, async variant!
 * Note that elements are processed to completion before the next element is began.
 */
export async function asyncFastMapFilter(arr, ...fns) {
	// pre-init same sized output
	const output = new Array(arr.length)

	let pos = 0
	elLoop: for (let i in arr) {
		let el = arr[i]

		// run each fn
		for (let fn of fns) {
			el = await fn(el, i, arr)
			if (el === NO_ENTRY) {
				continue elLoop
			}
		}

	console.log({el})
		output[pos++] = el
	}

	// trim output to final size
	return output.slice(0, pos)
}
