import {Observable} from "rxjs";
import {nextTick} from "vue";

export default async ({app}) => {
  // let recorder: any = null;
// Set up audio context
  const audioContext = new AudioContext();
  let context;
  let source;
  let processor;
  let ws;
  let stream;

  app.config.globalProperties.$speechToText = {
    start: (lang = "de-DE", message = "", continuous = false) => {
      return new Observable(subscriber => {
          ws = new WebSocket('ws://localhost:8001')
          ws.onopen = async () => {
            // Create a new audio context
            // Create a new audio context
            const AudioContext = window.AudioContext;
            context = new AudioContext();

            // Add your processor to the audio context
            await context.audioWorklet.addModule('audio-processor.js');

            // Get access to the microphone
            stream = await navigator.mediaDevices.getUserMedia({audio: true});

            // Create a new audio source from the microphone stream
            source = context.createMediaStreamSource(stream);

            // Create a new audio processor
            processor = new AudioWorkletNode(context, 'audio-processor');

            // Connect the audio source to the processor
            source.connect(processor);

            // Connect the processor to the context destination
            processor.connect(context.destination);

            // Listen for processor messages
            processor.port.onmessage = (event) => {
              const chunk = event.data.data;
              const rate = event.data.rate;
              console.log("chunk", chunk, rate)

              const rateBuffer = new Uint32Array([rate]);

              // Create a new buffer to hold the rate and the chunk
              const combinedBuffer = new Uint8Array(rateBuffer.byteLength + chunk.byteLength);

              // Add the rate and the chunk to the combined buffer
              combinedBuffer.set(new Uint8Array(rateBuffer.buffer), 0);
              combinedBuffer.set(new Uint8Array(chunk), rateBuffer.byteLength);
              // Here you can send the audio chunk and the sample rate to your WebSocket server
              ws.send(combinedBuffer.buffer);
            };
          }
          ws.onmessage = (message) => {
            const transcript = message.data
            console.log('data', message)
            if (transcript) {
              console.log('transcript', transcript)
            }
          }

          ws.onclose = () => {
            console.log({event: 'onclose'})
          }

          ws.onerror = (error) => {
            console.log({event: 'onerror', error})
          }
        }
      );
    },
    stop: () => {
      // Send a message to the processor to stop processing audio data
      if (processor) {
        processor.port.postMessage({ connected: false });
      }

      // Stop the MediaStreamTrack associated with the microphone
      stream.getTracks().forEach(track => track.stop());

      // Disconnect the audio source and processor
      source.disconnect();
      processor.disconnect();

      processor = null;  // Clear the processor
    }
  }
  ;
};
