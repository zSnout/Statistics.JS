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
