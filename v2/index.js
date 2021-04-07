(function(proto) {
  proto.min = function() {
    return Math.min(...this);
  };
  
  proto.max = function() {
    return Math.max(...this);
  };
  
  proto.range = function() {
    return this.max() - this.min();
  };
  
  proto.sum = function() {
    return this.reduce((a,b) => a + b);
  };
  
  proto.product = function() {
    return this.reduce((a,b) => a * b);
  };
  proto.prod = proto.product;
  
  proto.organize = function() {
    return this.sort(function(a,b) {
      return a < b ? -1 : b < a ? 1 : 0;
    });
  };
  
  proto.frequency = function() {
    var all = [];
    this.map(function(e) {
      if (all.map(e => e.item).indexOf(e) == -1) all.push({item:e,count:1});
      else all[all.map(e => e.item).indexOf(e)].count++;
    });
    
    return all;
  };
  proto.freq = proto.frequency;
  
  proto.frequencyOf = function(item) {
    var freq = this.frequency();
    
    if (freq.map(e => e.item).indexOf(item) == -1) return 0;
    else return freq[freq.map(e => e.item).indexOf(item)].count;
  };
  proto.freqOf = proto.frequencyOf;
  
  proto.frequencyObject = function() {
    var all = {};
    this.map(e => e in all ? all[e]++ : all[e] = 1);
    
    return all;
  };
  proto.freqObj = proto.frequencyObject;
  
  proto.average = function() {
    return this.sum() / this.length;
  };
  proto.avg = proto.average;
  proto.mean = proto.average;
  
  proto.median = function() {
    var arr = this.organize();
    var half = this.length / 2;
    return this.length % 2 === 0 ? [arr[half - 1],arr[half]].average() : arr[half - 0.5];
  };
  proto.middle = proto.median;
  proto.q2 = proto.median;
  
  proto.firstQuartile = function(median = false) {
    return this.lower(median).median();
  };
  proto.q1 = proto.firstQuartile;
  
  proto.thirdQuartile = function(median = false) {
    return this.upper(median).median();
  };
  proto.q3 = proto.thirdQuartile;
  
  proto.first = function() {
    return this.organize()[0];
  };
  proto.q0 = proto.first;
  
  proto.last = function() {
    return this.organize().reverse()[0];
  };
  proto.q4 = proto.last;
  
  proto.interquartileRange = function() {
    return this.q3() - this.q1();
  };
  proto.iqr = proto.interquartileRange;
  
  proto.summary = function(median = false) {
    return [this.q0(),this.q1(median),this.q2(),this.q3(median),this.q4()];
  };
  
  proto.mode = function() {
    var freq = this.frequency();
    var items = freq.map(e => e.item);
    var count = freq.map(e => e.count);
    var max = count.max();
    
    return items.filter((e,i) => count[i] == max);
  };
  
  proto.modeFrequency = function() {
    return this.frequency().map(e => e.count).max();
  };
  proto.modeFreq = proto.modeFrequency;
  
  proto.lower = function(median = false) {
    var cut = this.length % 2 === 0 ? this.length / 2 - 1 : (median ? this.length / 2 - 0.5 : this.length / 2 - 1.5);
    return this.organize().filter((e,i) => i <= cut);
  };
  
  proto.upper = function(median = false) {
    var cut = this.length % 2 === 0 ? this.length / 2 : (median ? this.length / 2 - 0.5 : this.length / 2 + 0.5);
    return this.organize().filter((e,i) => i >= cut);
  };
  
  proto.variance = function(sample = false) {
    var avg = this.average();
    return this.map(e => e - avg).map(e => e * e).sum() / (sample ? this.length - 1 : this.length);
  };
  
  proto.standardDeviation = function(sample = false) {
    return Math.sqrt(this.variance(sample));
  };
  proto.stdDev = proto.standardDeviation;
  
  proto.meanAbsoluteDeviation = function() {
    var avg = this.average();
    return this.map(e => Math.abs(e - avg)).average();
  };
  proto.mad = proto.meanAbsoluteDeviation;
  
  proto.lowerOutliers = function(max = "iqr") {
    var outliers = {
      "iqr": this.q1() - 1.5 * this.iqr(),
      "stddev": this.mean() - 2 * this.stdDev(),
      "mad": this.mean() - 2 * this.mad(),
    };
    if (typeof max == "string" && (max.toLowerCase() in Object.keys(outliers))) max = outliers[max.toLowerCase()];
    if (typeof max != "number") max = outliers.iqr;
    
    return this.filter(e => e < max);
  };
  
  proto.upperOutliers = function(min = "iqr") {
    var outliers = {
      "iqr": this.q3() + 1.5 * this.iqr(),
      "stddev": this.mean() + 2 * this.stdDev(),
      "mad": this.mean() + 2 * this.mad(),
    };
    if (typeof min == "string" && (min.toLowerCase() in Object.keys(outliers))) min = outliers[min.toLowerCase()];
    if (typeof min != "number") min = outliers.iqr;
    
    return this.filter(e => e > min);
  };
  
  proto.outliers = function(max,min = max) {
    return this.lowerOutliers(max).concat(this.upperOutliers(min));
  };
  
  proto.unique = function() {
    return this.filter((e,i) => this.indexOf(e) == i);
  };
  
  proto.flatten = function() {
    return this.flat(Infinity);
  };
  
  proto.within = function(min = -Infinity,max = Infinity) {
    if (typeof min != "number") min = -Infinity;
    if (typeof max != "number") max = Infinity;
    return this.filter(e => typeof e == "number" && e >= min && e <= max);
  };
  
  proto.force = function(min = -Infinity,max = Infinity) {
    if (typeof min != "number") min = -Infinity;
    if (typeof max != "number") max = Infinity;
    else return this.on(e => typeof e == "number",e => e < min ? min : e > max ? max : e);
  };
  
  proto.on = function(filter,func) {
    return this.map((e,i,arr) => filter(e,i,arr) ? func(e,i,arr) : e);
  };
})(Array.prototype);

Object.prototype.only = function() {
  var arr = [];
  function check(e) {
    if (typeof e == "number") arr.push(e);
    else if (typeof e == "function") check(e());
    else if (typeof e == "string") check(e.only());
    else if (Array.isArray(e)) Array.from(e).map(check);
    else if (typeof e == "object") Object.values(e).map(check);
  }
  
  if (Array.isArray(this)) {
    if (this.length > 0) this.map(check);
  } else Object.values(this).map(check);
  
  return arr;
};

String.prototype.only = function() {
  var match = this.match(/-?[0-9]+(\.[0-9]+)?/g);
  
  return Array.isArray(match) ? match.map(Number) : [];
};

Function.prototype.only = function() {
  return [this()].only();
};

Number.prototype.only = function() {
  return [this];
};

Boolean.prototype.only = function() {
  return [];
};
