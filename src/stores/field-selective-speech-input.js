import { defineStore } from 'pinia'

export const useFieldSelectiveSpeechInputStore = defineStore('fieldSelectiveSpeechInputStore', {
  state: () => ({
    counter: 0,
    isRecording: false,
    isFieldSelected: false,
    selectedFieldIsEmpty: true,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
})
