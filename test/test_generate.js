/*
 * For primary testing, so that all functionalities are ok
 *
 * @author Bismay K
 * */

global._ = require("lodash");

var expect = require('chai').expect;
var assert = require('assert');

var GENERATE = require("../api/generate");
var PROCESS = require("../api/process");

var maxSerials = 1000;
var serialList = [];
var resultList = [];

describe('Test on generated battery serials', function() {
    describe('#Serial from same family of generated serials', function() {
        serialList = [];
        for (i = 1; i < 10000; i++) {
            serialExt = ("" + i);
            serialNo = "L500" + "0000000000".substr(0, 5 - serialExt.length) + serialExt;
            serialList.push(serialNo);
        }

        resultList = [];
        _.each(serialList, function(serial, a) {
            serialHash = PROCESS.generateUniqueID(serial);
            resultList.push(serialHash);
        });
        resultList = resultList.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        it('should return ' + serialList.length + ' hashs, returned ' + resultList.length, function() {
            assert.equal(serialList.length == resultList.length, 1);
        });
    });

    describe('#Serial from random generated serial numbers', function() {
        serialList = GENERATE.generateSerialNo(maxSerials);
        it('should generate ' + maxSerials + ' serials', function() {
            assert.equal(serialList.length, maxSerials);
        });

        resultList = [];
        _.each(serialList, function(serial, a) {
            serialHash = PROCESS.generateUniqueID(serial);
            resultList.push(serialHash);
        });
        resultList = resultList.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        it('should return ' + serialList.length + ' hashs, returned ' + resultList.length, function() {
            assert.equal(serialList.length == resultList.length, 1);
        });
    });
});