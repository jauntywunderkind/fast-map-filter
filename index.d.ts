export declare const NO_ENTRY: unique symbol

export type MapFilterFn = (el: any, i: number, arr: any[]) => any

export declare function Filter(fn: MapFilterFn) : MapFilterFn

// each fns feeds into the next. thus, there's not a well-typed way to define the arbitrary chain of transforms here. so... any it is.
export declare function fastMapFilter(arr: any[], ...fns: MapFilterFn[]) : any
export declare async function asyncFastMapFilter(arr: any[], ...fns: MapFilterFn[]) : any
