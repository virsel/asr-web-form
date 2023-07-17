import {Observable} from "rxjs";

export default async ({app}) => {
  let recorder: any = null;


  app.config.globalProperties.$speechToText = {
    start: (lang = "de-DE", message = "", continuous = false) => {
      return new Observable(subscriber => {
        const socket = new WebSocket('ws://localhost:8001')
          socket.onopen = () => {
            navigator.mediaDevices
              .getUserMedia({audio: true, video: false})
              .then(handleSuccess);
          }

          const handleSuccess = async function (stream) {
            console.log("micro input", stream)
            recorder = new MediaRecorder(stream);
            const data: any = [];

            recorder.ondataavailable = (event) => {
              console.log("data event:", event)
              data.push(event.data)
              if (event.data.size > 0 && socket.readyState == 1) {
                socket.send(event.data)
              }
            };

            recorder.start(1000);

            socket.onmessage = (message) => {
              const transcript = message.data
              if (transcript) {
                console.log('transcript', transcript)
              }
            }

            socket.onclose = () => {
              console.log({ event: 'onclose' })
            }

            socket.onerror = (error) => {
              console.log({ event: 'onerror', error })
            }

            const stopped = new Promise((resolve, reject) => {
              recorder.onstop = resolve;
              recorder.onerror = (event) => {
                reject(event.name)
              };
            });

            Promise.all([stopped]).then(() => {
              console.log("data:", data)

              // Stop the microphone tracks
              const tracks = stream.getTracks();
              tracks.forEach(track => track.stop());
            });
          };
        }
      );
    },
    stop: () => {
      if (recorder != null) {
        console.log("stop recorder...")
        recorder.stop();
      }
    }
  }
  ;
};
