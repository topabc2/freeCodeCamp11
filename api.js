'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let send = null;
    let initUnit;
    let initNum;

    if(convertHandler.getNum(req.query.input).result === "invalid number") {
      if(!send) {
        send = "invalid number";
      } else {
        send = "invalid number and unit";
      }
    } else {
      initNum = convertHandler.getNum(req.query.input).result;
    }

    if(convertHandler.getUnit(req.query.input) === "invalid unit") {
      if(!send) {
        send = "invalid unit";
      } else {
        send = "invalid number and unit";
      }
    } else {
      initUnit = convertHandler.getUnit(req.query.input);
    }

    if(send) {
      res.status(200).send(send);
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.status(200).json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: Number(returnNum),
      returnUnit: returnUnit,
      string: string
    });
  });

};
