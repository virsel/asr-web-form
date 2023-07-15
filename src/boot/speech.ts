import {Observable} from "rxjs";

export default async ({app}) => {
  let recorder: any = null;

  app.config.globalProperties.$speechToText = {
    start: (lang = "de-DE", message = "", continuous = false) => {
      return new Observable(subscriber => {
        const handleSuccess = async function (stream) {
          console.log("micro input", stream)
          recorder = new MediaRecorder(stream);
          const data: any = [];

          recorder.ondataavailable = (event) => {
            console.log("data event:", event)
            data.push(event.data)
          };

          recorder.start(Math.round(16000 * 0.02));

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

        navigator.mediaDevices
          .getUserMedia({audio: true, video: false})
          .then(handleSuccess);
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
