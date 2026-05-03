export const AppConnectionLink = {
    ArduinoDownload: process.env.REACT_APP_ARDUINO_URL || 'https://www.arduino.cc/en/software#experimental-software',
    ESP8266Library: process.env.REACT_APP_ESP8266_LIB_URL ||
        ' http://arduino.esp8266.com/stable/package_esp8266com_index.json',
    ESP8266SetupVideo: process.env.REACT_APP_ESP8266_VIDEO_URL || 'https://youtu.be/YN522_npNqs',
};
