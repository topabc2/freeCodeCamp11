function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    result = input.split(/[gGkKlLmM]/)[0];

    if(result.includes('/')) {
      if(result.split('/').length > 2) {
        return { result: 'invalid number', null: false, init: input.split(/[gGkKlLmM]/)[0] }
      } else {
        result = Number(result.split('/')[0]) / Number(result.split('/')[1]);
        result = result.toFixed(5);
      }
    }

    if(!result) {
      return { result: 1, null: true, init: input.split(/[gGkKlLmM]/)[0] }
    } else if(!Number(result)) {
      return { result: 'invalid number', null: false, init: input.split(/[gGkKlLmM]/)[0] }
    }

    return { result: Number(result), null: false, init: input.split(/[gGkKlLmM]/)[0] }
  };
  
  this.getUnit = function(input) {
    let result;
    
    if(this.getNum(input).null) {
      result = input.toLowerCase();
    } else {
      result = input.split(this.getNum(input).init)[1].toLowerCase();
    }

    if(result === 'l') {
      result = 'L';
    } else if(result === "mi") {
      result = "mi";
    } else if(result === "km") {
      result = "km";
    } else if(result === "gal") {
      result = "gal";
    } else if(result === "lbs") {
      result = "lbs";
    } else if(result === "kg") {
      result = "kg";
    } else {
      result = "invalid unit";
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    if(initUnit === 'gal') {
      result = 'L';
    } else if(initUnit === 'km') {
      result = 'mi';
    } else if(initUnit === 'lbs') {
      result = 'kg';
    } else if(initUnit === 'L') {
      result = 'gal';
    } else if(initUnit === 'mi') {
      result = 'km';
    } else if(initUnit === 'kg') {
      result = 'lbs';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    if(unit === 'gal') {
      result = 'gallons';
    } else if(unit === 'L') {
      result = 'liters';
    } else if(unit === 'km') {
      result = 'kilometers';
    } else if(unit === 'mi') {
      result = 'miles';
    } else if(unit === 'lbs') {
      result = 'pounds';
    } else if(unit === 'kg') {
      result = 'kilograms';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if(initUnit === 'gal') {
      result = initNum * galToL;
    } else if(initUnit === 'L') {
      result = initNum / galToL;
    } else if(initUnit === 'km') {
      result = initNum / miToKm;
    } else if(initUnit === 'mi') {
      result = initNum * miToKm;
    } else if(initUnit === 'lbs') {
      result = initNum * lbsToKg;
    } else if(initUnit === 'kg') {
      result = initNum / lbsToKg;
    }
    
    return Number(result).toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
