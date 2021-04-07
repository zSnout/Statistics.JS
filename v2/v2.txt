StatisticsJS v2 is a lightweight library which provides functions for simple statistical calculations.
It is a new version of a previous library (StatisticsJS v1) by zSnout.

Differences between v1 and v2:
  v1 added a new class (NumericalData), whereas v2 adds new methods onto the `Array` class.
  v1 had several aliases for methods, whereas v2 has fewer aliases.
  v1 would force the list to consist of only numbers, whereas v2 has a method for that, but will not automatically execute it.

StatisticsJS v2 adds several methods to the `Array` object. None of these will alter the source array unless specified.
  .min(): Returns the minimum value in the array.
  .max(): Returns the maximum value in the array.
  .range(): Returns the difference between the maximum and minimum values of the array.
  .sum(): Returns the sum of the elements in the array.
  .product(): Returns the product of the elements in the array.
  .organize(): Returns a sorted version of the current array.
  .frequency(): Returns an array containing objects. Each object has a key `item` specifying an item in the array, and a key `count` specifying how many times that value occurs in the array.
  .frequencyOf(item): Returns the number of times this item occurs in the array.
  .frequencyObject(): Returns an object with the keys being the elements in the array, and the values being how many times that value is in the array. Note that all keys will be strings.
  .average(): Returns the average of the elements in the array.
  .median(): Returns the median of the array.
  .firstQuartile(median?): Returns the first quartile of the array. If `median` is true, will include median in the lower half of the array (see .lower()).
  .thirdQuartile(median?): Returns the third quartile of the array. If `median` is true, will include median in the upper half of the array (see .upper()).
  .first(): Returns the first element of the organized array.
  .last(): Returns the last element of the organized array.
  .interquartileRange(): Returns the interqartile range of the array.
  .summary(median?): Returns the five-number summary of the array [q0,q1,q2,q3,q4]. If `median` is true, will include median in lower/upper half of the array (see .firstQuartile() and .thirdQuartile()).
  .mode(): Returns an array containing the values that occur the most in the array.
  .modeFrequency(): Returns the number of times the element that occurs the most occurs.
  .lower(median?): Returns an array with the lower half of the elements. If array length is odd, will only include middle value if `median` is true.
  .upper(median?): Returns an array with the upper half of the elements. If array length is odd, will only include middle value if `median` is true.
  .variance(sample?): Returns the variance of the array. If `sample` is true, calculates the sample variance.
  .standardDeviation(sample?): Returns the standard deviation of the array. If `sample` is true, calculates the sample standard deviation.
  .meanAbsoluteDeviation(): Returns the mean absolute deviation of the array.
  .lowerOutliers(max?): Returns outliers that are below a certain point. You may specify "iqr", "stddev", "mad", or a number for `max`, which is the boundary line. It defaults to "iqr".
  .upperOutliers(min?): Returns outliers that are above a certain point. You may specify "iqr", "stddev", "mad", or a number for `min`, which is the boundary line. It defaults to "iqr".
  .outliers(max?,min?): Returns outliers that are below a certain point or above a certain point. If `min` is not specified, it defaults to `max`, and if `max` is not specified, it defaults to "iqr". See .lowerOutliers() and upperOutliers() for more information.
  .unique(): Returns the array but with all non-unique elements removed. Note that this will not work on elements such as functions, arrays, or objects.
  .flatten(): Expands all subarrays into the main one until there are no subarrays left. Essentially calling .flat(Infinity).
  .within(min?,max?): Returns all numbers in the array that are at least `min` and at most `max`. If `min` is not a number, defaults to -Infnity, and if `max` is not a number, defaults to Infinity.
  .force(min,max): Forces all numbers in the array to be at least `min` and at most `max`, then returns the array. Does not alter the original array or any non-number elements. If `min` is not a number, defaults to -Infnity, and if `max` is not a number, defaults to Infinity.

There is also a method used to filter elements that are numbers: .only(). This is implemented in several places.
  Array().only(): Filters the array and looks for any elements that are numbers, then returns them in an array. Additionally, it will check the return value of functions, check every value of any objects found, check every elements of any arrays found, and look for any numbers within strings.
  String().only(): Checks for any numbers within the String and returns them as an array.
  Object().only(): Filters the object values in the same way that Array().only() does.
  Function().only(): Runs the function, then filters the output to check for numbers in the same way that Array().only() does.
  Number().only(): Returns an array containing the number. Added for completeness.
  Boolean().only(): Returns an empty array. Added for completeness.

Because .only() is implemented on the Object class, it should be present on any other class made, even if StatisticsJS is included after, unless that class overrides it. If you want to run .only() on a class other than a default one, convert the item to an array, then run .only(). This guarentees safety.

There is also a non-statistics method, .on():
  Array().on(filter(element,index,array),map(element,index,array)): Executes `.map()` using `map` on all elements that match `filter`.
    For each element, it runs the `filter` function as if calling `Array.filter`.
    If the function returns `true`, it will change the value to the one returned by the `map` function, called as if using `Array.map`.
    If the function returns `false`, it will keep the value as its current value.
    In essence, it calls `Array.map` on elements which match `filter`.
    You can also use this as if calling `Array.forEach` instead of `Array.map`, as this does not alter the original array.

StatisticsJS v2 also adds the following aliases to existing or new methods on the `Array` class:
  .prod() == .product()
  .freq() == .frequency()
  .freqOf() == .frequencyOf()
  .freqObj() == .frequencyObject()
  .avg() == .average()
  .mean() == .average()
  .middle() == .median()
  .q0() == .first()
  .q1() == .firstQuartile()
  .q2() == .median()
  .q3() == .thirdQuartile()
  .q4() == .last()
  .iqr() == .interquartileRange()
  .modeFreq() == .modeFrequency()
  .stdDev() == .standardDeviation()
  .mad() == .meanAbsoluteDeviation()

For example, say you want to check a textarea field and return every number, then 

Another example: Say you need to change every element in an array `arr` which occurs more than three times to be "hi", but keep all other elements the same.
  Without StatisticsJS:
    arr.map(e => arr.filter(i => i == e).length > 3 ? "hi" : e)
  With StatisticsJS v1:
    NumericalData(arr).map(e => this.freqOf(e) > 3 ? "hi" : e)
  With StatisticsJS v2:
    arr.on(e => this.freqOf(e) > 3,e => "hi")
