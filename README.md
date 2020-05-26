# Statistics.JS

Statistics.JS is a quick, lightweight, and easy-to-use basic statistics library.

### Installation

There are two versions of Statistics.JS. One is the `statistics.js` file (~20 kB), which contains the development version of Statistics.JS. The other is `statistics.min.js` (~7 kB), which contains the production version. We reccomend using the `statistics.min.js` file or using the zSnout hosted version at `https://zsnout.com/libs/statistics.min.js`.

### Creating a Data Set

You can create a new data set with the `NumericalData()` function. It accepts a comma-seperated list of data, which can be any of these types:

#### Number

Numbers will be added to the data set as numbers.

#### String

Statistics.JS will look through the string and attempt to find numbers within the string. These will be added to the data set.

#### Function

Statistics.JS will evaluate the function and re-parse the value returned.

#### Array

Statistics.JS will re-parse each value within the array.

#### Object

Statistics.JS will re-parse each value within the object.

### Computing Values

#### Descriptive Statistics

 - The lower data set `.lower`
 - The upper data set `.upper`
 - The set in ascending order `.asc`
 - The set in descending order `.desc`
 - The data set as an array `.data`
 - The sum of all values `.sum()`
 - The product of all values `.product()`

#### Measures of Center

 - The minimum value `.min()`
 - The maximum value `.max()`
 - The first quartile `.q1()`
 - The median `.median()`
 - The third quartile `.q3()`
 - The mean `.mean()`
 - The modes `.modes()`
 - The mode `.mode()`

#### Measures of Spread

 - The standard deviation `.stdDev()`
 - The sample standard deviation `.sampleStdDev()`
 - The variance `.variance()`
 - The sample variance `.sampleVariance()`
 - The MAD (mean absolute deviation) `.mad()`
 - The IQR (Interquartile Range) `.iqr()`
 - The range `.range()`

#### Outliers

 - Outliers by Q<sub>1/3</sub> ± 1.5 × IQR `.iqrOutliers()` *or* `.outliers("IQR")`
 - Outliers by mean ± 2 × StdDev `.stdDevOutliers()` *or* `.outliers("StdDev")`
 - Outliers by mean ± 2 × MAD `.madOutliers()` *or* `.outliers("MAD")`
 - Outliers by custom boundaries `.outliers(max,min)` *Numbers will be added as outliers if they are less than `max` or more than `min`.*

### Updating a Data Set

 - Add an item to the data set `.add(item)`
 - Add several items to the data set `.add(item1,item2...)`
 - Add several copies of an item to the data set `.addSeveral(frequency,item)`
 - Add several copies of several items to the data set `.addSeveral(frequency,item1,item2...)`
 - Set the contents of the data set `.data = [item1,item2...]`
 - Clear the data set `.clear()`
 - Purify the data set (re-parse and clear any non-numerical values) `.purify()`
