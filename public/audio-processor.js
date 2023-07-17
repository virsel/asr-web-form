// audio-processor.js
class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buffer = [];
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    // Convert the audio data to 16-bit integers and add it to the buffer
    this.buffer.push(...Int16Array.from(input[0].map(n => n * 32767)));

    // If the buffer has approximately one second of audio data
    if (this.buffer.length >= sampleRate) {  // sampleRate is a built-in variable
      // Post the buffered audio data to the main thread
      const int16Array = Int16Array.from(this.buffer);
      this.port.postMessage({data: int16Array.buffer, rate: sampleRate}, [int16Array.buffer]);
      // Clear the buffer
      this.buffer = [];
    }

    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
