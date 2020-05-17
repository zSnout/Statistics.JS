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
                        var matches = String(data[0]).match(/([0-9]+.[0-9]+)|(.[0-9]+)|([0-9]+)/g);
                        if (matches === null || matches === undefined) {
                            matches = [];
                        }
                        for (var i = 0;i < matches.length;i++) {
                            this.push(Number(matches[i]));
                        }
                        return this;
                    }
                    for (var i = 0;i < data.length;i++) {
                        this.add(data[i]);
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
                
                min() {
                    this.purify();
                    if (this.length === 0) {
                        console.warn("Using NumericalData(...).min without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
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
                        console.warn("Using NumericalData(...).max without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
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
                
                sum() {
                    this.purify();
                    if (this.length === 0) {
                        console.warn("Using NumericalData(...).sum without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
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
                        console.warn("Using NumericalData(...).sum without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
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
                
                range() {
                    this.purify();
                    return this.max() - this.min();
                }
                
                median() {
                    this.purify();
                    if (this.length === 0) {
                        console.warn("Using NumericalData(...).median without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
                        return 0;
                    } else {
                        if (this.length % 2 == 1) {
                            return this[(this.length - 1) / 2];
                        } else {
                            return (this[(this.length - 2) / 2] + this[this.length / 2]) / 2;
                        }
                    }
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
                        console.warn("Using NumericalData(...).modes without any data may not return an appropriate result. For compatibility reasons, it will return [] without any data.");
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
                    var modes = this.modes();
                    if (this.length === 0) {
                        console.warn("Using NumericalData(...).mode without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
                        return 0;
                    } else {
                        return modes[0];
                    }
                }
                
                variance(sample) {
                    sample = !!sample;
                    this.purify();
                    if (this.length === 0) {
                        console.warn("Using NumericalData(...).variance without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
                        return 0;
                    }
                    var mean = this.average();
                    var list = window.Statistics.NumericalData();
                    for (var i = 0;i < this.length;i++) {
                        list.push((this[i] - mean) * (this[i] - mean));
                    }
                    return list.sum() / (sample ? list.length - 1 : list.length);
                }
                
                standardDeviation(sample) {
                    sample = !!sample;
                    return Math.sqrt(this.variance(sample));
                }
                
                stdDev(sample) {
                    return this.standardDeviation();
                }
                
                mad() {
                    this.purify();
                    if (this.length === 0) {
                        console.warn("Using NumericalData(...).mad without any data may not return an appropriate result. For compatibility reasons, it will return 0 without any data.");
                        return 0;
                    }
                    var mean = this.average();
                    var list = window.Statistics.NumericalData();
                    for (var i = 0;i < this.length;i++) {
                        list.push(Math.abs(this[i] - mean));
                    }
                    return list.average();
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
                        median: this.median(),
                        mode: this.mode(),
                        variance: this.variance(false),
                        sampleVariance: this.variance(true),
                        standardDeviation: this.standardDeviation(false),
                        sampleStandardDeviation: this.standardDeviation(true),
                        mad: this.mad()
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
                    obj.data = this.data;
                    obj.html = html;
                	return obj;
                }
                
                stats() {
                    return this.statistics();
                }
            })(...data);
        }
    };
    window.NumericalData = window.Statistics.NumericalData;
})(window,document);
