void setup() {

  Serial.begin(9600); 
  
  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, LOW);
}

void loop() {

   if(Serial.available() > 0) 
    {
      char ReaderFromNode; 
      ReaderFromNode = (char) Serial.read();
      convertToState(ReaderFromNode); 
    }
  delay(1000); 
}

void convertToState(char chr) {
  if(chr=='w'){
    digitalWrite(LED_BUILTIN, HIGH);
    delay(100); 
  }
  if(chr=='t'){
    digitalWrite(LED_BUILTIN, LOW);
    delay(100); 
  }
}
