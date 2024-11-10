#include <Servo.h>
#include <SoftwareSerial.h>
int state = 0;
Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards
SoftwareSerial BluetoothSerial(3, 2);

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
   BluetoothSerial.begin(9600);
}

void loop() {
    if(BluetoothSerial.available() > 0){ // Checks whether data is comming from the serial port
    state = Serial.read(); // Reads the data from the serial port
 }
  if (state == 1) {
for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(10);                       // waits 10ms for the servo to reach the position
  }
  for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(10);                       // waits 10ms for the servo to reach the position
  }
 } 
  
}