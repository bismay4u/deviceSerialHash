/*
 * Main code for the unique Serial Hash code generation.
 *
 * @author Bismay K
 * */

global._ = require("lodash");
global.fs = require("fs");

global.GENERATE = require("./api/generate");
global.PROCESS = require("./api/process");

function test1() {
    serialList = [
        "L50057",
        "L50060",
    ];
    testSerialList(serialList);
}

function test2() {
    serialList = [];
    hashReult = [];
    for (i = 1; i < 10000; i++) {
        serialExt = ("" + i);
        serialNo = "L500" + "0000000000".substr(0, 5 - serialExt.length) + serialExt;
        serialList.push(serialNo);
    }

    testSerialList(serialList);
}

function test3() {
    contents = fs.readFileSync('./serialdb/dump.txt', 'utf8');
    serialList = contents.trim().split("\n");
    serialList = serialList.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    testSerialList(serialList);
}

function testSerialList(serialList) {
    resultList = [];
    errorList = [];
    _.each(serialList, function(serial, a) {
        serialHash = PROCESS.generateUniqueID(serial);
        if (resultList.indexOf(serialHash) >= 0) {
            console.log(serial, serialHash, ":", serialList[resultList.indexOf(serialHash)]);
            errorList.push([
                serial,
                serialList[resultList.indexOf(serialHash)],
                serialHash
            ]);
        } else {
            // console.log(serial, serialHash);
        }
        resultList.push(serialHash);
    });
    console.log("Errors : ", errorList.length, ", Out of unique ", serialList.length, " serials");
}

function maxlengthSerial() {
    contents = fs.readFileSync('./serialdb/dump.txt', 'utf8');
    serialList = contents.trim().split("\n");
    maxLength = 0;
    _.each(serialList, function(serial, b) {
        serial = serial.trim();
        if (maxLength < serial.length) {
            maxLength = serial.length;
            // console.log(serial, serial.length);
        }
    });
    console.log("Max length of serial in given list ", maxLength);
}

test3();
// maxlengthSerial();