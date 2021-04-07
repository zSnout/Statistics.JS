# Statistics.JS
StatisticsJS is a JavaScript library that allows you to work with statistics and arrays REALLY easily.
It currently has two versions, v1 and v2. They are NOT compatiable with each other, and differences between them will be explained below.

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
- 
