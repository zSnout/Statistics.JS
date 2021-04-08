# StatisticsJS v2
StatisticsJS v2 is a new library by zSnout which provided functions for simple and complex statistical calculations, as well as a few extra.

# Main Usage
StatisticsJS v2 adds new methods to existing classes. Most methods are added to the `Array` class, but another is added to all classes. More on that later.

It does not automatically filter out non-numbers when calling. You can do that with the `.only()` method, which is talked about later.
The behavior of these functions when using non-numbers differs, but several will work anyways.

# Methods on the `Array` Object
Here is a list of all the methods you can call on a member of the `Array` class.
Note that NONE of these alter the original array, and will instead return a value which you can then use elsewhere.
Any methods which work predictably when using non-numbers will have an `*` marking that, and an explanation of how they work.

## `.min()`
This returns the minimum value in the array.

## `.max()`
This returns the maximum value in the array.

## `.range()`
This returns the range of the array (maximum - minimum).

## `.sum()`*
This returns the sum of all the values in the array.
When called on non-numbers, it will concatenate the values, or convert them to numbers, in order.

## `.product()`
This returns the product of all the values in the array.

## `.organize()`*
This returns the array sorted by value. This is not identical to `.sort()`. That sorts as if everything is a string, whereas this uses the numerical value.
When called on non-numbers, it will sort them using `<` and `>`.

## `.frequency()`*
This returns an array containing several objects representing the frequency of each element in the array. Each object has a key `item` which specifies the element and a key `count` which specifies now many times it occurred.
When called on non-numbers, this works in the expected manner.

## `.frequencyOf(item: Any)`*
This returns the number of times that the element occurs within the array.
When called on non-numbers, this works in the expected manner.

## `.frequencyObject()`
This returns an object with each key being an element within the array, and its value being the number of times is occurred in the array.

## `.average()`
This returns the average of the array.

## `.median()`
This returns the median of the array.

## `.firstQuartile(median?: Boolean)`
This returns the first quartile of the array. If `median` is true, it will include the median in the lower half of the array when calculating the quartile.
`median` defaults to `false`.

## `.thirdQuartile(median?: Boolean)`
This returns the third quartile of the array. If `median` is true, it will include the median in the upper half of the array when calculating the quartile.
`median` defaults to `false`.

## `.first()`
This returns the first element of the organized array.

## `.last()`
This returns the last element of the organized array.

## `.interquartileRange()`
This returns the interquartile range of the array.

## `.summary(median?: Boolean)`
This returns an array of the five-number summary of the array (min, q1, median, q3, max). See `.firstQuartile()` and `.thirdQuartile()` for information about what `median` does.

## `.mode()`
This returns an array that contains the values that occur the most in the array.
The reason it is an array and not just a number is because there can be more than one mode.

## `.modeFrequency()`
This returns the number of times that the mode(s) occur as a Number.

## `.lower(median?: Boolean)`
This returns the lower half of the array. If `median` is `true` and the length is odd, this will include the median in the lower half of the array.
`median` defaults to `false`.

## `.upper(median?: Boolean)`
This returns the upper half of the array. If `median` is `true` and the length is odd, this will include the median in the upper half of the array.
`median` defaults to `false`.

## `.variance(sample?: Boolean)`
This returns the variance of the array. If `sample` is `true`, will return the sample variance.
`sample` defaults to `false`.

## `.standardDeviation(sample?: Boolean)`
This returns the standard deviation of the array. If `sample` is `true`, will return the sample standard deviation.
`sample` defaults to `false`.

## `.meanAbsoluteDeviation()`
This returns the mean absolute deviation of the array.

## `.lowerOutliers(max?: String/Number)`
This returns outliers that are lower than a given point.
`max` can be `"iqr"`, `"stddev"`, `"mad"`, or a Number.
`max` defaults to `"iqr"`.

## `.upperOutliers(min?: String/Number)`
This returns outliers that are higher than a given point.
`min` can be `"iqr"`, `"stddev"`, `"mad"`, or a Number.
`min` defaults to `"iqr"`.

## `.outliers(max?: String/Number, min?: String/Number)`
This returns outliers of the array that are lower than a given value or higher that another given value.
`max` and `min` can be `"iqr"`, `"stddev"`, `"mad"`, or a Number.
`max` defaults to `"iqr"`.
`min` defaults to `max`.

## `.unique()`
This returns all unique elements of the array.

## `.flatten()`
This expands all subarrays of the current array into the main one. Basically calling `.flat(Infinity)`.

## `.within(min?: Number/Null, max?: Number/Null)`
This returns all numbers in the array that are at least `min` and at most `max`.
`min` defaults to `-Infinity`.
`max` defaults to `+Infinity`.

## `.force(min?: Number/Null, max?: Number/Null)`
This returns the array, but changes every number less that `min` to `min`, and changes every numbers greater than `max` to `max`.
`min` defaults to `-Infinity`.
`max` defaults to `+Infinity`.

## `.on(filter: Function, map: Function)`
This runs `filter` on every element, and maps every element for which `filter` is true to its return value from `map`. Then it returns the new array.

`filter` should take three arguments: `filter(element: Any, index: Number, array: Array) => Boolean`.
`element` is the element which the filter is executing on.
`index` is the index of the element in the original array.
`array` is the original array.

`map` should take three arguments: `map(element: Any, index: Number, array: Array) => Any`.
`element` is the element which the map is executing on.
`index` is the index of the element in the original array.
`array` is the original array.

For every element, it passes the element, the index, and the original array to `filter`.
If `filter` returns `true`, it passes the element, its index, and the original array to `map`.
It then changes the element's value to the return value of `map`.

Note that this does not alter the original array.

# The Special `.only()` Method
The `.only()` method checks for any numbers within the original array. Any numbers found will be returned. However, it also tries to check for numbers within other types of elements.

## `String`
In `String`s, it will attempt to search for any numbers that match this regular expression: `-?[0-9]+(\.[0-9]+)?`.

## `Array`
In `Array`s, it will attempt to re-search every element of the array.

## `Object`
In `Object`s, it will attempt to re-search every value of the array.

## `Function`
In `Function`s, it will attempt to re-search the return value of the function.

The `.only()` method is implemented on the `Object`, `Array`, `String`, `Function`, and `Number` classes.
Additionally, it is implemented on `Boolean`s, but that always returns an empty array.
