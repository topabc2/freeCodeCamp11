const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("read a whole number input", function() {
        assert.isNotString(convertHandler.getNum("10L").result);
    });

    test("read a decimal number input", function() {
        assert.isNotString(convertHandler.getNum("3.1mi").result);
    });

    test("read a fractional input", function() {
        assert.isNotString(convertHandler.getNum("3/2mi").result);
    });

    test("read a fractional input with a decimal", function() {
        assert.isNotString(convertHandler.getNum("3/1.5mi").result);
    });

    test("error on a double-fraction", function() {
        assert.isString(convertHandler.getNum("3/2/3mi").result);
    });

    test("default to 1 when no numerical input is provided", function() {
        assert.equal(convertHandler.getNum("km").result, 1);
    });

    test("read valid input unit", function() {
        assert.equal(convertHandler.getUnit("10km"), "km");
    });

    test("error for invalid input unit", function() {
        assert.equal(convertHandler.getUnit("10kim"), "invalid unit");
    });

    test("correct return unit for valid input unit", function() {
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
    });

    test("spelled-out string unit for valid input unit", function() {
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    });

    test("convert gal to L", function() {
        assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    });

    test("convert L to gal", function() {
        assert.equal(convertHandler.convert(1, "L"), 0.26417);
    });

    test("convert mi to km", function() {
        assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    });

    test("convert km to mi", function() {
        assert.equal(convertHandler.convert(1, "km"), 0.62137);
    });

    test("convert lbs to kg", function() {
        assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    });

    test("convert kg to lbs", function() {
        assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    });
});