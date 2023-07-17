// audio-processor.js
class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = [];
    this.speaking = false;
    this.silenceStart = null;
    this.debounceTime = 1;  // 1 second
    this.connected = true;  // Add this flag

    // Handle messages from the main thread
    this.port.onmessage = (event) => {
      if (event.data.hasOwnProperty('connected')) {
        this.connected = event.data.connected;
      }
    };
  }

  process(inputs, outputs, parameters) {
    // If the processor is not connected, don't process the audio data
    if (!this.connected) {
      return true;
    }

    const input = inputs[0];
    const output = outputs[0];

    // Calculate the RMS volume
    const rms = Math.sqrt(input[0].reduce((acc, val) => acc + val * val, 0) / input[0].length);

    // If the volume exceeds a threshold, consider it as the speaker speaking
    const threshold = 0.01;  // Adjust this value based on your needs
    if (rms > threshold) {
      // Convert the audio data to 16-bit integers and add it to the buffer
      this.buffer.push(...Int16Array.from(input[0].map(n => n * 32767)));
      this.speaking = true;
      this.silenceStart = null;
    } else if (this.speaking) {
      // If the volume has fallen below the threshold
      if (this.silenceStart === null) {
        // If this is the start of the silence, record the current time
        this.silenceStart = currentTime;  // currentTime is a built-in variable
      } else if (currentTime - this.silenceStart > this.debounceTime) {
        // If the silence has lasted for the debounce time, post the buffered audio data to the main thread
        const int16Array = Int16Array.from(this.buffer);
        this.port.postMessage({data: int16Array.buffer, rate: sampleRate}, [int16Array.buffer]);
        // Clear the buffer and reset the speaking flag and silence start time
        this.buffer = [];
        this.speaking = false;
        this.silenceStart = null;
      }
    }

    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
