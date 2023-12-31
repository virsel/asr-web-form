<template>
  <div v-if="isRecording">
    <q-spinner-bars></q-spinner-bars>
    <q-toggle v-if="isFieldSelected" v-model="withCommandInput" class="cmd-speech-input-toggle" color="secondary"
              label="Befehlseingabe"/>
    <q-btn dense
           flat
           icon="stop"
           round
           @click="stop()"/>
  </div>
  <q-btn v-else
         dense
         flat
         icon="keyboard_voice"
         round
         @click="record()"/>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useFieldSelectiveSpeechInputStore } from "stores/field-selective-speech-input";

const baseCommands = {
  stopRecording: /\b(stop|stopp)\b/i, // stop
  nextField: /\b(weiter|next)\b/i, // weiter
  previousField: /\b(zurück|back)\b/i // zurück
};

const recognizedCommandType = {
  nothingRecognized: 0,
  clearField: 1,
  unselectField: 2,
  nextField: 3,
  previousField: 4,
  stopRecording: 5
};

const fieldInputCommands = {
  clearField: /\bk(\.| )?o\b/i, // k.o
  unselectField: /\b(ok|ok(ey|ay))\b/i // ok
};

const extractCommand = (transcript, commands) => {
  for (const key in commands) {
    const regex = commands[key];
    const match = transcript.match(regex);
    if (match) {
      const cmdType = recognizedCommandType[key];
      const index = match.index;
      const matchLength = match[0].length;

      const beforeMatch = transcript.slice(0, index); // part of transcript before the match
      const afterMatch = transcript.slice(index + matchLength); // part of transcript after the match

      return {
        fieldInput: beforeMatch,
        commandType: cmdType,
        nextTranscript: afterMatch
      };
    }
  }

  return {
    fieldInput: transcript,
    commandType: recognizedCommandType.nothingRecognized,
    nextTranscript: "" // or null if you prefer
  };
};

export default {
  name: "FieldSelectiveSpeechInput",
  data() {
    return {
      lang: this.$i18n.locale,
      isRecording: storeToRefs(useFieldSelectiveSpeechInputStore()).isRecording,
      isFieldSelected: storeToRefs(useFieldSelectiveSpeechInputStore()).isFieldSelected,
      withCommandInput: ref(true)
    };
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    }
  },
  mounted(){
    this.$bus.on("field-selective-speech-input_after-field-select-input", (transcript) => {
      this.handleSpeechInput(transcript);
    });
  },
  beforeUnmount() {
    this.$bus.off("field-selective-speech-input_after-field-select-input");
  },
  methods: {
    record() {
      this.isRecording = true;
      this.$bus.emit("field-selective-speech-input_start");
      const handleSpeechInput = this.handleSpeechInput;
      this.$speechToText.start(this.lang, null, true)
        .subscribe({
          next(suc) {
            handleSpeechInput(suc);
            // this.record()
          },
          error() {
            this.isRecording = false;
          },
          complete() {
            this.isRecording = false;
          }
        });
    },
    handleSpeechInput(suc) {
      console.log("speech input:", suc)
      let res = {}
      if (this.isFieldSelected) {
        res = extractCommand(suc, fieldInputCommands);
        this.handleSpeechInputFieldInputCmd(res);
      } else {
        res = extractCommand(suc, baseCommands);
        // no command recognized -> normal selection by label
        if (res.commandType === recognizedCommandType.nothingRecognized) {
          this.handleSpeechInputFieldSelection(suc);
        } else {
          this.handleBaseSpeechInputCmd(res)
        }
      }

      if (res?.nextTranscript?.trim() != "") {
        this.handleSpeechInput(res.nextTranscript)
      }
    },
    handleBaseSpeechInputCmd(recognizedCmd) {
      if (recognizedCmd.commandType == recognizedCommandType.stopRecording) {
        this.stop()
      } else if (recognizedCmd.commandType == recognizedCommandType.nextField) {
        this.$bus.emit("field-selective-speech-input_next");
      } else if (recognizedCmd.commandType == recognizedCommandType.previousField) {
        this.$bus.emit("field-selective-speech-input_back");
      }
    },
    handleSpeechInputFieldInputCmd(res) {
      if (!this.withCommandInput || res.commandType === recognizedCommandType.nothingRecognized) {
        this.$bus.emit("field-selective-speech-input_input", res.fieldInput);
      } else if (res.commandType == recognizedCommandType.clearField) {
        this.$bus.emit("field-selective-speech-input_clear");
      } else if (res.commandType == recognizedCommandType.unselectField) {
        this.$bus.emit("field-selective-speech-input_unselect", res.fieldInput);
      }
    },
    handleSpeechInputFieldSelection(suc) {
      this.$bus.emit("field-selective-speech-input_select", suc);
    },
    stop() {
      this.$speechToText.stop();
      this.isRecording = false;
      this.$bus.emit("field-selective-speech-input_stop");
    }
  }
};
</script>

<style>
</style>
