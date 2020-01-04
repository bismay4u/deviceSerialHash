# Constant Length Serial Hash Algorithm

This project is meant to generate a unique no for for a device serial which will generate 4-8 digit length unique code per device serial depending on sub-algorithm selected. If we embed this value into the data transfered from devices to application, then we can confirm that the test done is correctly for the same device. We can in future also use this to automatically validate device test data transfered over any protocol because of it low payload size and light weight algorithm.

### The benefits
+ This code is unique for a string sequence, thus allowing proper validation.
+ The hash is small string, so does not increase the payload size much.
+ The hash is fixed length, so does not impact the payload encoding or decoding.
+ Since the code possess relative unique nature per series, we can use that as visual security of testing done by testers.

### Assumptions
+ The maximum length of the serial number is going to be 15.

Thank you
Bismay M
