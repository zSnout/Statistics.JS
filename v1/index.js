(function(window,document) {
    window.Statistics = {
        NumericalData: function(...data) {
            return new (class NumericalData extends Array {
                constructor(...data) {
                    super();
                    this.add(data);
                    return this;
                }
                
                add(...data) {
                    if (data.length === 0) {
                        return this;
                    }
                    if (data.length == 1) {
                        if (typeof(data[0]) == "object") {
                            var vals = Object.values(data[0]);
                            for (var i = 0;i < vals.length;i++) {
                                this.add(vals[i]);
                            }
                            return this;
                        }
                        if (typeof(data[0]) == "number") {
                            this.push(data[0]);
                            return this;
                        }
                        if (typeof(data[0]) == "function") {
                            this.add((data[0])());
                            return this;
                        }
                        var matches = String(data[0]).match(/-?(([0-9]+\.[0-9]+)|(\.[0-9]+)|([0-9]+))/g);
                        if (matches === null || matches === undefined) {
                            matches = [];
                        }
                        for (var j = 0;j < matches.length;j++) {
                            this.push(Number(matches[j]));
                        }
                        return this;
                    }
                    for (var k = 0;k < data.length;k++) {
                        this.add(data[k]);
                    }
                    return this;
                }
                
                addSeveral(howMany,...data) {
                    if (howMany === undefined || typeof howMany != "number" || howMany < 1) {
                        return;
                    }
                    for (var i = 0;i < howMany;i++) {
                        this.add(...data);
                    }
                    return this;
                }
                
                clear(Return) {
                    var array = this.data;
                    this.splice(0,this.length);
                    if (!!Return) {
                        return array;
                    }
                    return this;
                }
                
                get data() {
                    return Array(...this);
                }
                
                set data(x) {
                    this.clear();
                    this.add(x);
                }
                
                purify() {
                    var array = this.data;
                    this.splice(0,this.length);
                    this.add(array);
                    return this;
                }
                
                count() {
                    this.purify();
                    return this.length;
                }
                
                get lower() {
                    this.purify();
                    this.data = this.asc;
                    if (this.length === 0 || this.length == 1) {
                        return window.Statistics.NumericalData();
                    }
                    if (this.length % 2 === 0) {
                        return this.slice(0,this.length / 2);
                    } else if (this.length % 2 == 1) {
                        return this.slice(0,(this.length - 1) / 2 + 1);
                    }
                    return window.Statistics.NumericalData();
                }
                
                get upper() {
                    this.purify();
                    this.data = this.asc;
                    if (this.length === 0 || this.length == 1) {
                        return window.Statistics.NumericalData();
                    }
                    if (this.length % 2 === 0) {
                        return this.slice(this.length / 2,this.length);
                    } else if (this.length % 2 == 1) {
                        return this.slice((this.length + 1) / 2 - 1,this.length);
                    }
                    return window.Statistics.NumericalData();
                }
                
                get asc() {
                    var n = window.Statistics.NumericalData(this.data);
                    n.sort(function(a,b) {
                        if (a < b) {
                            return -1;
                        } else if (a > b) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return n;
                }
                
                get desc() {
                    var n = window.Statistics.NumericalData(this.data);
                    n.sort(function(a,b) {
                        if (a < b) {
                            return 1;
                        } else if (a > b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                    return n;
                }
                
                link() {
                    this.purify();
                    return "https://zsnout.com/statistics?data=" + this.data.join(",");
                }
                
                permalink() {
                    return this.link();
                }
                
                permaLink() {
                    return this.link();
                }
                
                url() {
                    return this.link();
                }
                
                min() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    } else if (this.length == 1) {
                        return this[0];
                    } else {
                        var min = this[0];
                        for (var i = 1;i < this.length;i++) {
                            if (this[i] < min) {
                                min = this[i];
                            }
                        }
                        return min;
                    }
                }
                
                max() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    } else if (this.length == 1) {
                        return this[0];
                    } else {
                        var max = this[0];
                        for (var i = 1;i < this.length;i++) {
                            if (this[i] > max) {
                                max = this[i];
                            }
                        }
                        return max;
                    }
                }
                
                range() {
                    this.purify();
                    return this.max() - this.min();
                }
                
                sum() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    } else {
                        var sum = 0;
                        for (var i = 0;i < this.length;i++) {
                            sum += this[i];
                        }
                        return sum;
                    }
                }
                
                product() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    } else {
                        var product = 1;
                        for (var i = 0;i < this.length;i++) {
                            product *= this[i];
                        }
                        return product;
                    }
                }
                
                average() {
                    this.purify();
                    return this.sum() / this.length;
                }
                
                mean() {
                    return this.average();
                }
                
                avg() {
                    return this.average();
                }
                
                median() {
                    this.purify();
                    this.data = this.asc;
                    if (this.length === 0) {
                        return 0;
                    } else {
                        if (this.length % 2 == 1) {
                            return this[(this.length - 1) / 2];
                        } else {
                            return (this[(this.length - 2) / 2] + this[this.length / 2]) / 2;
                        }
                    }
                }
                
                q1() {
                    return this.lower.median();
                }
                
                q2() {
                    return this.median();
                }
                
                q3() {
                    return this.upper.median();
                }
                
                quartile1() {
                    return this.q1();
                }
                
                quartile2() {
                    return this.q2();
                }
                
                quartile3() {
                    return this.q3();
                }
                
                lowerQuartile() {
                    return this.q1();
                }
                
                upperQuartile() {
                    return this.q3();
                }
                
                iqr() {
                    return this.q3() - this.q1();
                }
                
                interQuartileRange() {
                    return this.iqr();
                }
                
                interquartileRange() {
                    return this.iqr();
                }
                
                frequency() {
                    this.purify();
                    if (this.length === 0) {
                        return {};
                    }
                    var arr = {};
                    for (var i = 0;i < this.length;i++) {
                        if (this[i] in arr) {
                            arr[this[i]]++;
                        } else {
                            arr[this[i]] = 1;
                        }
                    }
                    return arr;
                }
                
                frequencyOf(x) {
                    return this.frequency()[x] === undefined ? 0 : this.frequency()[x];
                }
                
                frequencyKeys() {
                    this.purify();
                    var keys = Object.keys(this.frequency());
                    for (var i = 0;i < keys.length;i++) {
                        keys[i] = Number(keys[i]);
                    }
                    return keys;
                }
                
                frequencyValues() {
                    this.purify();
                    var vals = Object.values(this.frequency());
                    for (var i = 0;i < vals.length;i++) {
                        vals[i] = Number(vals[i]);
                    }
                    return vals;
                }
                
                freq() {
                    return this.frequency();
                }
                
                freqKeys() {
                    return this.frequencyKeys();
                }
                
                freqVals() {
                    return this.frequencyKeys();
                }
                
                freqOf(x) {
                    return this.frequencyOf(x);
                }
                
                modes() {
                    this.purify();
                    if (this.length === 0) {
                        return [];
                    }
                    
                    var freq = this.frequency();
                    var keys = this.frequencyKeys();
                    var vals = this.frequencyValues();
                    
                    if (keys.length == 1) {
                        return keys[0];
                    }
                    
                    var maxVal = vals[0];
                    for (var i = 1;i < this.length;i++) {
                        if (vals[i] > maxVal) {
                            maxVal = vals[i];
                        }
                    }
                    
                    var maxKeys = [];
                    for (i = 0;i < this.length;i++) {
                        if (vals[i] == maxVal) {
                            maxKeys.push(keys[i]);
                        }
                    }
                    
                    return maxKeys;
                }
                
                mode() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    } else {
                        var modes = this.modes();
                        return modes[0];
                    }
                }
                
                modeFreq() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    } else {
                        var modes = this.modes();
                        return this.freqOf(modes[0]);
                    }
                }
                
                variance(sample) {
                    sample = !!sample;
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    }
                    var mean = this.average();
                    var list = window.Statistics.NumericalData();
                    for (var i = 0;i < this.length;i++) {
                        list.push((this[i] - mean) * (this[i] - mean));
                    }
                    return list.sum() / (sample ? list.length - 1 : list.length);
                }
                
                sampleVariance() {
                    return this.variance(true);
                }
                
                standardDeviation(sample) {
                    sample = !!sample;
                    return Math.sqrt(this.variance(sample));
                }
                
                stdDev(sample) {
                    return this.standardDeviation();
                }
                
                sampleStandardDeviation() {
                    return this.standardDeviation(true);
                }
                
                sampleStdDev() {
                    return this.standardDeviation(true);
                }
                
                mad() {
                    this.purify();
                    if (this.length === 0) {
                        return 0;
                    }
                    var mean = this.average();
                    var list = window.Statistics.NumericalData();
                    for (var i = 0;i < this.length;i++) {
                        list.push(Math.abs(this[i] - mean));
                    }
                    return list.average();
                }
                
                meanAbsoluteDeviation() {
                    return this.mad();
                }
                
                lowerOutliers(max) {
                    var outliers = {
                        "iqr": this.q1() - 1.5 * this.iqr(),
                        "stddev": this.mean() - 2 * this.stdDev(),
                        "standarddeviation": this.mean() - 2 * this.stdDev(),
                        "mad": this.mean() - 2 * this.mad(),
                        "meanabsolutedeviation": this.mean() - 2 * this.mad()
                    };
                    if (typeof max == "string" && (max.toLowerCase() in Object.keys(outliers))) {
                        max = outliers[max.toLowerCase()];
                    }
                    
                    if (max === undefined || isNaN(Number(max))) {
                        max = outliers.iqr;
                    }
                    
                    max = Number(max);
                    
                    var list = window.Statistics.NumericalData();
                    for (var i = 0;i < this.length;i++) {
                        if (this[i] < max) {
                            list.add(this[i]);
                        }
                    }
                    
                    return list;
                }
                
                upperOutliers(min) {
                    var outliers = {
                        "iqr": this.q3() + 1.5 * this.iqr(),
                        "stddev": this.mean() + 2 * this.stdDev(),
                        "standarddeviation": this.mean() + 2 * this.stdDev(),
                        "mad": this.mean() + 2 * this.mad(),
                        "meanabsolutedeviation": this.mean() + 2 * this.mad()
                    };
                    if (typeof min == "string" && (min.toLowerCase() in Object.keys(outliers))) {
                        min = outliers[min.toLowerCase()];
                    }
                    
                    if (min === undefined || isNaN(Number(min))) {
                        min = outliers.iqr;
                    }
                    
                    min = Number(min);
                    
                    var list = window.Statistics.NumericalData();
                    for (var i = 0;i < this.length;i++) {
                        if (this[i] > min) {
                            list.add(this[i]);
                        }
                    }
                    
                    return list;
                }
                
                outliers(max,min) {
                    if (min === undefined) {
                        min = max;
                    }
                    return this.lowerOutliers(max).concat(this.upperOutliers(min));
                }
                
                iqrOutliers() {
                    return this.outliers("iqr");
                }
                
                stdDevOutliers() {
                    return this.outliers("stddev");
                }
                
                standardDeviationOutliers() {
                    return this.outliers("stddev");
                }
                
                madOutliers() {
                    return this.outliers("mad");
                }
                
                meanAbsoluteDeviationOutliers() {
                    return this.outliers("mad");
                }
                
                iqrBounds() {
                    return [this.q1() - 1.5 * this.iqr(),this.q3() + 1.5 * this.iqr()];
                }
                
                stdDevBounds() {
                    return [this.mean() - 2 * this.stdDev(),this.mean() + 2 * this.stdDev()];
                }
                
                madBounds() {
                    return [this.mean() - 2 * this.mad(),this.mean() + 2 * this.mad()];
                }
                
                fiveNum() {
                    return [this.min(),this.q1(),this.median(),this.q3(),this.max()];
                }
                
                fiveNumber() {
                    return this.fiveNum();
                }
                
                fiveNumberSummary() {
                    return this.fiveNum();
                }
                
                fiveNumSummary() {
                    return this.fiveNum();
                }
                
                statistics() {
                    var obj = {
                        length: this.length,
                        min: this.min(),
                        max: this.max(),
                        sum: this.sum(),
                        product: this.product(),
                        range: this.range(),
                        mean: this.mean(),
                        mode: this.mode(),
                        modeFreq: this.modeFreq(),
                        q1: this.q1(),
                        median: this.median(),
                        q3: this.q3(),
                        fiveNum: this.fiveNum(),
                        iqr: this.iqr(),
                        variance: this.variance(false),
                        sampleVariance: this.variance(true),
                        stdDev: this.standardDeviation(false),
                        sampleStdDev: this.standardDeviation(true),
                        mad: this.mad(),
                        iqrOutliers: this.outliers("IQR"),
                        stdDevOutliers: this.outliers("stdDev"),
                        madOutliers: this.outliers("MAD"),
                    };
                    
                    var html = "<table>";
                    function add(txt) {
                        html += "\n" + txt;
                    }
                    add("    <thead>");
                    add("        <tr>");
                    add("            <th>Statistic</th>");
                    add("            <th>Value</th>");
                    add("        </tr>");
                    add("    </thead>");
                    add("    <tbody>");
                    for (var key in obj) {
                    add("        <tr>");
                    add("            <td>" + key + "</td>");
                    add("            <td>" + obj[key] + "</td>");
                    add("        </tr>");
                    }
                    add("    </tbody>");
                    add("</table>");
                    obj.html = html;
                    
                    obj.data = this.data;
                    obj.lower = this.lower;
                    obj.upper = this.upper;
                    
                    return obj;
                }
                
                get stats() {
                    return this.statistics();
                }
            })(...data);
        }
    };
    window.NumericalData = window.Statistics.NumericalData;
})(window,document);
