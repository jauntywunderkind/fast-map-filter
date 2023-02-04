#!/usr/bin/env node

import { deepEqual } from "node:assert"
import { describe, it } from "node:test"
import { fastMapFilter, asyncFastMapFilter, Filter, NO_ENTRY } from "./fast-map-filter.js"

function range(n) {
	const arr = new Array(n)
	for (let i = 0; i < n; ++i) {
		arr[i] = i
	}
	return arr
}

// decent example of general use
describe("mixed chains", () => {
	it("can mix map and filter", () =>
		deepEqual(
			fastMapFilter(
				range(9), // input array
				x => x + 1, // functions are assumed to be "map" functions
				Filter(x => x % 2 === 0), // Filter() wraps/identifies "filter" functions
				x => x * 2), // arbitrary numbers of maps & filters can be provided as arguments
			[4, 8, 12, 16]))
	// map and filter can be in any order... here's filter first
	it("can filter and map", () =>
		deepEqual(
			fastMapFilter(
				range(9),
				Filter(x => x % 3 === 0),
				x => x - 2),
			[-2, 1, 4]))
})

describe("map", () => {
	it("can map", () =>
		deepEqual(
			fastMapFilter(
				range(3),
				x => x + 1),
			[1, 2, 3]))
	it("can map twice", () =>
		deepEqual(
			fastMapFilter(
				range(3),
				x => x * 2,
				x => x + 1),
			[1, 3, 5]))
	it("can map thrice", () =>
		deepEqual(
			fastMapFilter(
				range(3),
				x => x * 2,
				x => x + 1,
				x => x * 2),
			[2, 6, 10]))
	it("can also filter", () =>
		deepEqual(
			fastMapFilter(
				range(9),
				x => x % 3 === 0 ? x + 1 : NO_ENTRY),
			[1, 4, 7]))
})

describe("filter", () => {
	it("can filter", () =>
		deepEqual(
			fastMapFilter(
				range(4),
				Filter(x => x % 2)),
			[1, 3]))
	it("can filter twice", () =>
		deepEqual(
			fastMapFilter(
				range(13),
				Filter(x => x % 2),
				Filter(x => x % 3)),
			[1, 5, 7, 11]))

})

describe("async", () => {
	it("will await", { only: true }, async () =>
		deepEqual(
			await asyncFastMapFilter(
				range(3),
				async (x) => x * 2,
				Filter(async (x) => x % 3 === 0)),
			[0, 2, 4]))
				
})
