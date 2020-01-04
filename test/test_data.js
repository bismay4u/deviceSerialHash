/*
 * For primary testing, so that all functionalities are ok
 *
 * @author Bismay K
 * */

global._ = require("lodash");
global.fs = require("fs");

var expect = require('chai').expect;
var assert = require('assert');

var GENERATE = require("../api/generate");
var PROCESS = require("../api/process");

var serialList = [];
var resultList = [];

describe('Test on actual battery serials', function() {
    describe('#Serial from dump file', function() {
        contents = fs.readFileSync('./serialdb/dump.txt', 'utf8');
        serialList = contents.trim().split("\n");
        serialList = serialList.filter((value, index, self) => {
            return self.indexOf(value) === index;
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

    describe('#Serial from cherry picked serials', function() {
        serialList = [
            "L50057",
            "L50060",
        ];

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