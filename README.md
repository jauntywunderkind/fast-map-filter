# fast-map-filter

> fast map/filter chains

Speed-optimized/single-pass single-pass way to run an arbitrary of map/filter calls. It avoids a number of disadvantages when doing a series of map and filter (or filter and map) operations. 

1. Multiple map and filter operations are combined, and ran through in a single pass through the target array: this single iteration can increase performance significantly. 
2. Instead of growing the result array over time, the destination array is allocated to be the same size as the input, and is then chopped down at the end. This avoids incrementally growing the output array over time, which is a costly operation. 
  * But it does require a sizable up-front allocation; generally unless a system is space constrained this should be fine, but especially if the filter is going to remove the vast majority of the data, it may not be a win.

# Usage

```js
import { fastMapFilter, Filter } from "fast-map-filter"

const isDivisibleBy2 = Filter(x => x % 2 === 0)

console.log(fastMapFilter(
	[0, 1, 2, 3, 4, 5, 6, 7, 8], // input array
	x => x + 1, // functions are assumed to be "map" functions
	Filter(x => x % 2 === 0) // Filter() wraps/identifies "filter" functions
	x => x * 2 // arbitrary numbers of maps & filters can be provided as arguments
)) //=> [ 4, 8, 12, 16 ]
```

There is also an `asyncFastMapFilter` which awaits each result. This might allow an example pipeline like below, where some steps are async. (Note that each userId will be processed to completion before the next userId starts.)

```js
const locations = asyncFastMapFilter(
	userIds,
	fetchUsersById,
	filterInactiveUsers,
	getAddress,
	geolocate
)
```
