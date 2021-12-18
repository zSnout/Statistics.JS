# Statistics.JS
StatisticsJS is a JavaScript library that allows you to work with statistics and arrays REALLY easily.
It currently has two versions, v1 and v2. They are NOT compatiable with each other, and differences between them will be explained below.

# v1 Deprecation

Statistics.JS v1 is deprecated. I wrote it when I was 11 and I want to keep it as a piece of my coding history. Check it out for an example of what NOT to do! #lol

# v1
StatisticsJS v1 adds a new class, NumericalData. You can call it with or without the `new` keyword.

NumericalData inherits from Array, meaning it keeps the base methods of Array while adding its own.

NumericalData will automatically convert any array you pass to it into a regular NumericalData, meaning you can use `NumericalData(1,2,3)` or `NumericalData([1,2,3])`.

Before calling any methods, it automatically calls `.purify()`, which removes any non-numbers and searches for ANY numbers to keep. See its documentation for more details.

# v2
StatisticsJS v2 adds new methods onto the Array class, as well as another one (`.only()`) onto every class (Number, Boolean, Object, Array, Function, String), which does mean that every other class also inherits `.only()`.

It is much smaller and faster and can be used much more easily. It also has some additional method that v1 does not, namely `.within()`, `.force()`, and `.on()`.

StatisticsJS v2 will not automatically look for numbers before calculating things, and many of the methods work even without only using numbers (`.frequency()` and `.mode()` being two of them).
Of course, others will break (`.average()` returns `NaN` when called on an array of strings).
You have to do this manually with the `.only()` method.

# Main Differences
- v1 has many aliases for methods, while v2 has far fewer aliases.
- v1 adds a new class, while v2 adds onto the Array class.
- v1 will only accept numbers and actively filters them, while v2 will accept any values.
- v1 adds additional methods `.add()`, `.addSeveral()`, `.clear()`, and `.purify()`.
- v2 adds additional methods `.within()`, `.force()`, `.only()`, and `.on()`.
- v1 uses `.purify()` to ALTER the original array and remove any non-numbers, while v2 uses `.only()` to RETURN a new array with all numbers in the source array.
- v1 has special methods for the outlier types "iqr", "stddev", and "mad", while v2 uses an argument passed to it.
- v1 uses the PROPERTIES `.lower`, `.upper`, `.asc`, `.desc`, and `.data` for the lower and upper halves of the array, the array in forward/backward order, and the elements as an array.
- v2 uses the METHODS `.lower()`, `.upper()`, and `.organize()` for the lower and upper halves of the array, and the array sorted.
- v2 accept an argument (median) in several methods to optionally count the median when calculating the lower/upper halves of the array, the quartiles, and the five-number summary.
