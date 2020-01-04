/*
 * Process the serial number to generate the Unique Code
 *
 * @author Bismay K
 * */

module.exports = {
    generateUniqueID: function(batterySerialString) {
        if (batterySerialString == null) return "";

        batterySerial = batterySerialString.trim().toUpperCase().replace(/[^a-z0-9\-]/gmi, '-');
        batterySerial = batterySerial.split('');

        //To nulify same family error nearby number error
        batterySerialNew = _.merge([], batterySerial);
        for (i = 1; i <= (batterySerial.length / 3); i++) {
            batterySerialNew.push(batterySerial[batterySerial.length - i]);
        }
        batterySerial = batterySerialNew;

        batteryHash = "";
        batteryNum = 0;
        _.each(batterySerial, (a, b) => {
            asciiValue = a.charCodeAt(0);

            hexIndex = b.toString(16);
            hexData = asciiValue.toString(16);
            if (hexIndex.length < 2) hexIndex = "0" + hexIndex;
            // if (hexData.length < 2) hexData = "0" + hexData;

            batteryNum += parseInt((hexData + hexIndex), 16);
            batteryNum = ((batteryNum << 3) + batteryNum); // | (batteryNum >> (b - 3));
            batteryNum = Math.abs(batteryNum);

            // console.log(batteryNum);
            // console.log(a, b, ':', asciiValue, hexData, hexIndex, ":", (hexData + hexIndex), parseInt((hexData + hexIndex), 16), batteryNum, ":", batteryNum.toString(16));
        });
        batteryNum = Math.abs(batteryNum);

        maxHashLength = 8;

        batteryHash = batteryNum.toString(16);
        batteryHash = "00000000".substr(0, maxHashLength - batteryHash.length) + batteryHash;
        return batteryHash.toUpperCase().substr(0, maxHashLength);
    }
};