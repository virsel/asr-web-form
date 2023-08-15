import {Observable} from "rxjs";


export default async ({app}) => {
  // intern asr
  let audioContext;
  let source;
  let processor;
  let ws;
  let stream;
  const startInternAsr = (subscriber) => {
    ws = new WebSocket('ws://localhost:8001')
    ws.onopen = async () => {
      // Get access to the microphone
      stream = await navigator.mediaDevices.getUserMedia({audio: true});

      // Create a new audio context
      audioContext = new window.AudioContext();

      // Create a new audio source from the microphone stream
      source = audioContext.createMediaStreamSource(stream);

      // Add your processor to the audio context
      await audioContext.audioWorklet.addModule('audio-processor.js');

      // Create a new audio processor
      processor = new AudioWorkletNode(audioContext, 'audio-processor');

      // Connect the audio source to the processor
      source.connect(processor);


      // Listen for processor messages
      processor.port.onmessage = (event) => {
        const chunk = event.data.data;
        const rate = event.data.rate;

        const rateBuffer = new Uint32Array([rate]);

        // Create a new buffer to hold the rate and the chunk
        const combinedBuffer = new Uint8Array(rateBuffer.byteLength + chunk.byteLength);

        // Add the rate and the chunk to the combined buffer
        combinedBuffer.set(new Uint8Array(rateBuffer.buffer), 0);
        combinedBuffer.set(new Uint8Array(chunk), rateBuffer.byteLength);
        ws.send(combinedBuffer.buffer);
      };
    }
    ws.onmessage = (message) => {
      const transcript = message.data
      if (transcript) {
        console.log('transcript', transcript)
        subscriber.next(transcript);
      }
    }

    ws.onclose = () => {
      console.log({event: 'onclose'})
    }

    ws.onerror = (error) => {
      console.log({event: 'onerror', error})
    }
  }
  const stopInternAsr = () => {
    // // Send a message to the processor to stop processing audio data
    if (processor) {
      processor.port.postMessage({connected: false});
    }

    // Stop the MediaStreamTrack associated with the microphone
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }

  // web speech asr
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : false;
  const startWebSpeechAsr = (lang, subscriber) => {
    if (!recognition)
      return

    recognition.lang = lang;
    recognition.continuous = true;
    recognition.start();

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      // Get a transcript of what was said.
      const transcript = event.results[current][0].transcript;
      subscriber.next(transcript);
    };

    recognition.onend = () => {
      console.log("stopped recognition")
      subscriber.complete();
    };
  }
  const stopWebSpeechAsr = () => {
    if (!recognition)
      return
    recognition.stop();
  }

  app.config.globalProperties.$speechToText = {
    start: (lang = "de-DE", message = "") => {
      return new Observable(subscriber => {
          if (recognition) {
            console.log("starting web speech asr...")
            startWebSpeechAsr(lang, subscriber)
          } else {
            console.log("starting intern asr...")
            startInternAsr(subscriber)
          }
        }
      );
    },
    stop: () => {
      if (recognition) {
        stopWebSpeechAsr()
      } else {
        stopInternAsr()
      }
    }
  }
  ;
};
