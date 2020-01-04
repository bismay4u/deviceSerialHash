/*
 * Generate SerialNos based on regular expression,
 * Validate them and test them
 *
 * @author Bismay K
 * */

var RandExpGen = require("randexp");

module.exports = {
    generateSerialNo: function(count) {
        if (count == null) count = 10;
        stringSeries = [];
        regex = new RegExp("^[0-9- A-Z]{10}$");
        for (i = 0; i < count; i++) {
            stringSeries.push(new RandExpGen(regex).gen());
        }

        return stringSeries;
    }
};