<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-pt-md q-px-md">
      <div class="col-12 q-pt-md text-h4">
        Objekterfassung
      </div>
    </div>

    <div class="row q-pt-md q-px-md q-col-gutter-x-xl form-wrapper">
      <div class="col-lg-6 col-12">
        <div class="row">
          <q-card class="full-width" flat>
            <q-card-section>
              <div class="text-h6">Typ</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    Haupttyp
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-select
                      v-model="typeSelections.mainType" :options="optionsMainType"
                      map-options
                      outlined
                      square />
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    Untertyp
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-select
                      v-model="typeSelections.accomodationSubType" :options="optionsAccomodationSubType"
                      map-options
                      outlined
                      square>
                    </q-select>
                  </q-item>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="row">
          <q-card class="full-width" flat>
            <q-card-section>
              <div class="text-h6">Lage</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    Land
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-select
                      v-model="areaSelections.country" :options="optionsCountry"
                      map-options
                      outlined
                      square>
                    </q-select>
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.city.label }}</span>
                    Platz/Ort
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.city.ref = el }"
                      v-model="speechInputFieldValues.city"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      type="tek"
                      @focus="selectSpeechInputFieldManually('city')"
                      @focusout="unselectSpeechInputField"
                    />
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.street.label }}</span>
                    Straße
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.street.ref = el }"
                      v-model="speechInputFieldValues.street"
                      class="q-mr-sm field-selective-speech-input-element"
                      outlined
                      square
                      type="tek"
                      @focus="selectSpeechInputFieldManually('street')"
                      @focusout="unselectSpeechInputField"
                    />
                  </q-item>
                </div>
                <div class="flex items-center">
                  <div class="text-body1 text-black">
                    <span class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.streetnr.label }}</span>
                    Nr.
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.streetnr.ref = el }"
                      v-model="speechInputFieldValues.streetnr"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      type="tek"
                      @focus="selectSpeechInputFieldManually('streetnr')"
                      @focusout="unselectSpeechInputField"
                    />
                  </q-item>
                </div>
              </div>
            </q-card-section>

          </q-card>
        </div>
      </div>

      <div class="col">
        <div class="row">
          <q-card class="full-width" flat>
            <q-card-section>
              <div class="text-h6">Kosten</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    Vertragsart
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-select
                      v-model="costsSelections.contractKind" :options="costsOptions.contractKind"
                      map-options
                      outlined
                      square>
                    </q-select>
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span
                      class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.netColdRent.label }}</span>
                    Nettokaltmiete
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.netColdRent.ref = el }"
                      v-model="speechInputFieldValues.netColdRent"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      @focus="selectSpeechInputFieldManually('streetnr')"
                      @focusout="unselectSpeechInputField"
                    />
                    <q-select
                      v-model="costsSelections.netColdRentKind"
                      :options="costsOptions.netColdRentKind" label="Art"
                      map-options
                      outlined
                      square />
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span
                      class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.monthlyOperatingCost.label }}</span>
                    Betriebskosten mtl.
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.monthlyOperatingCost.ref = el }"
                      v-model="speechInputFieldValues.monthlyOperatingCost"
                      :readonly="costsSelections.monthlyOperatingCostKind == 'k.A.'"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      @focus="selectSpeechInputFieldManually('monthlyOperatingCost')"
                      @focusout="unselectSpeechInputField"
                    />
                    <q-select
                      v-model="costsSelections.monthlyOperatingCostKind"
                      :options="costsOptions.monthlyOperatingCostKind" label="Art"
                      map-options
                      outlined
                      square />
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span
                      class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.monthlyHeatingCost.label }}</span>
                    Heizkosten mtl.
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.monthlyHeatingCost.ref = el }"
                      v-model="speechInputFieldValues.monthlyHeatingCost"
                      :readonly="costsSelections.monthlyHeatingCostKind == 'k.A.'"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      @focus="selectSpeechInputFieldManually('monthlyHeatingCost')"
                      @focusout="unselectSpeechInputField"
                    />
                    <q-select
                      v-model="costsSelections.monthlyHeatingCostKind"
                      :options="costsOptions.monthlyHeatingCostKind" label="Art"
                      map-options
                      outlined
                      square />
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.deposit.label }}</span>
                    Kaution
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.deposit.ref = el }"
                      v-model="speechInputFieldValues.deposit"
                      :readonly="costsSelections.depositKind == 'k.A.'"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      @focus="selectSpeechInputFieldManually('deposit')"
                      @focusout="unselectSpeechInputField"
                    />
                    <q-select
                      v-model="costsSelections.depositKind"
                      :options="costsOptions.depositKind" label="Art"
                      map-options
                      outlined
                      square />
                  </q-item>
                </div>
              </div>

            </q-card-section>
          </q-card>
        </div>
        <div class="row">
          <q-card class="full-width" flat>
            <q-card-section>
              <div class="text-h6">Nutzung</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    Verwendungszweck
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-select
                      v-model="usageSelections.purpose"
                      :options="usageOptions.purpose" map-options
                      outlined
                      square />
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span
                      class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.livingSpace.label }}</span>
                    Wohnfläche
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-select
                      v-model="usageSelections.livingSpace"
                      :options="usageOptions.livingSpace" map-options
                      outlined
                      square />
                    <q-input
                      :ref="(el) => { speechInputFields.livingSpace.ref = el }"
                      v-model="speechInputFieldValues.livingSpace"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      @focus="selectSpeechInputFieldManually('livingSpace')"
                      @focusout="unselectSpeechInputField"
                    >
                      <template v-slot:append>
                        <div>
                          m²
                        </div>
                      </template>
                    </q-input>
                  </q-item>
                </div>
              </div>
              <div class="row">
                <div class="col-4 flex items-center">
                  <div class="text-body1 text-black">
                    <span class="text-info q-mr-sm speech-input-select-id">{{ speechInputFields.rooms.label }}</span>
                    Zimmer
                  </div>
                </div>
                <div class="col">
                  <q-item>
                    <q-input
                      :ref="(el) => { speechInputFields.rooms.ref = el }"
                      v-model="speechInputFieldValues.rooms"
                      class="field-selective-speech-input-element"
                      outlined
                      square
                      @focus="selectSpeechInputFieldManually('rooms')"
                      @focusout="unselectSpeechInputField"
                    />
                  </q-item>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="sass">
body
  .speech-input-select-id
    display: none

  &.field-selective-speach-input-enabled
    .speech-input-select-id
      display: unset

    .field-selective-speech-input-element
      .q-field__control:before
        border-color: #31CCEC
</style>

<script>

import { speechInputFields as newEstateSpeechInputFields } from "../models/speech-input-forms/new-estate";
import { useFieldSelectiveSpeechInputStore } from "stores/field-selective-speech-input";
import { storeToRefs } from "pinia";

export default {
  name: "PageIndex",
  data() {
    return {
      fieldSelectiveSpeechInputStore: useFieldSelectiveSpeechInputStore(),
      isSpeechInputEnabled: storeToRefs(useFieldSelectiveSpeechInputStore()).isRecording,
      isSpeechInputFieldSelected: storeToRefs(useFieldSelectiveSpeechInputStore()).isFieldSelected,
      speechInputFields: newEstateSpeechInputFields,
      selectedSpeechInputField: null,
      previousSelectedSpeechInputField: null,
      // -- form related
      // speech input field values
      speechInputFieldValues: {
        city: "",
        street: "",
        streetnr: "",
        netColdRent: "",
        monthlyOperatingCost: "",
        monthlyHeatingCost: "",
        deposit: "",
        livingSpace: "",
        rooms: ""
      },
      // type section
      typeSelections: { mainType: "Wohnung", country: "Deutschland", accomodationSubType: "Apartment" },
      optionsMainType: ["Wohnung"],
      optionsAccomodationSubType: [
        {
          label: "Apartment",
          value: "(1)"
        },
        {
          label: "Etagenwohnung",
          value: "(2)"
        },
        {
          label: "Ferienwohnung",
          value: "(3)"
        },
        {
          label: "Erdgeschosswohnung",
          value: "(4)"
        }
      ],

      // area section
      areaSelections: { country: "Deutschland" },
      optionsCountry: [
        {
          label: "Deutschland",
          value: "(1)"
        },
        {
          label: "Österreich",
          value: "(2)"
        },
        {
          label: "Schweiz",
          value: "(3)"
        }
      ],

      // costs section
      costsOptions: {
        contractKind: [
          {
            label: "Miete",
            value: "(1)"
          },
          {
            label: "Kauf",
            value: "(2)"
          }
        ],
        netColdRentKind: ["EUR", "EUR VB", "n.V.", "auf Anfrage"],
        monthlyOperatingCostKind: ["EUR", "EUR zzgl. ges. MwSt.", "k.A."],
        monthlyHeatingCostKind: ["EUR", "EUR zzgl. ges. MwSt.", "in Betriebskosten enth.", "k.A."],
        depositKind: ["EUR", "EUR VB", "n.V.", "KM", "k.A."]
      },
      costsSelections: {
        contractKind: "Miete",
        netColdRentKind: "EUR",
        monthlyOperatingCostKind: "EUR",
        monthlyHeatingCostKind: "EUR",
        depositKind: "EUR"
      },

      // usage section
      usageOptions: {
        purpose: ["Wohnen", "Gewerbe", "Wohnen und Gewerbe"],
        livingSpace: ["ca.", ""]
      },
      usageSelections: {
        purpose: "Wohnen",
        livingSpace: ""
      }
    };
  },
  mounted() {
    this.$bus.on("field-selective-speech-input_start", () => {
      document.body.classList.add("field-selective-speach-input-enabled");
    });
    this.$bus.on("field-selective-speech-input_stop", () => {
      document.body.classList.remove("field-selective-speach-input-enabled");
    });
    this.$bus.on("field-selective-speech-input_select", (transcript) => {
      console.log("field-selective-speech-input_select", transcript);
      this.selectSpeechInputFieldBySpeechCommand(transcript);
    });
    this.$bus.on("field-selective-speech-input_input", (transcript) => {
      this.selectedSpeechInputFieldInput(transcript);
    });
    this.$bus.on("field-selective-speech-input_unselect", (transcript) => {
      this.unselectSpeechInputFieldCmd(transcript);
    });
    this.$bus.on("field-selective-speech-input_clear", () => {
      this.clearSpeechInputFieldCmd();
    });
    this.$bus.on("field-selective-speech-input_next", () => {
      this.selectNextSpeechInputField();
    });
    this.$bus.on("field-selective-speech-input_back", () => {
      this.selectPreviousSpeechInputField();
    });
  },
  methods: {
    // selection specific
    selectSpeechInputFieldManually(selectedSpeechInputFieldKey) {
      if (!this.speechInputFields[selectedSpeechInputFieldKey].ref.isProgrammaticFocus) {
        console.log("select speech input field manually", selectedSpeechInputFieldKey, this.fieldSelectiveSpeechInputStore);
        this.selectSpeechInputField(selectedSpeechInputFieldKey);
      }

      this.speechInputFields[selectedSpeechInputFieldKey].ref.isProgrammaticFocus = false;
    },
    selectSpeechInputFieldBySpeechCommand(speechCmd) {
      const selectedSpeechInputFieldKey = this.determineAffectedField(speechCmd);
      this.selectSpeechInputFieldByKey(selectedSpeechInputFieldKey)
    },
    selectSpeechInputFieldByKey(key) {
      if (key != null) {
        this.speechInputFields[key].ref.isProgrammaticFocus = true;
        this.speechInputFields[key].ref.focus();
        this.selectSpeechInputField(key);
      }
    },
    determineAffectedField(speechCmd) {
      for (const key in this.speechInputFields) {
        if (this.speechInputFields.hasOwnProperty(key)) {
          const element = this.speechInputFields[key];
          if (element.regex.test(speechCmd)) {
            return key;
          }
        }
      }
      return null;
    },
    selectSpeechInputField(key) {
      console.log("select speech input field", key);
      this.selectedSpeechInputField = key;
      this.isSpeechInputFieldSelected = true;
    },
    unselectSpeechInputField(evt) {
      console.log("focus out", evt);
      if (
        evt.relatedTarget &&
        evt.relatedTarget.classList.contains("cmd-speech-input-toggle")
      ) {
        setTimeout(() => this.speechInputFields[this.selectedSpeechInputField].ref.focus(), 100)
      } else {
        this.previousSelectedSpeechInputField = this.selectedSpeechInputField;
        this.selectedSpeechInputField = null;
        this.isSpeechInputFieldSelected = false;
      }
    },
    selectNextSpeechInputField() {
      const keys = Object.keys(this.speechInputFields)
      if(this.previousSelectedSpeechInputField == null || keys.indexOf(this.previousSelectedSpeechInputField) == keys.length - 1)
      {
        this.selectSpeechInputFieldByKey(keys[0])
      }
      else {
        this.selectSpeechInputFieldByKey(keys[keys.indexOf(this.previousSelectedSpeechInputField) + 1])
      }
    },
    selectPreviousSpeechInputField() {
      const keys = Object.keys(this.speechInputFields)
      if(this.previousSelectedSpeechInputField == null)
      {
        this.selectSpeechInputFieldByKey(keys[0])
      }
      else {
        this.selectSpeechInputFieldByKey(keys[keys.indexOf(this.previousSelectedSpeechInputField)])
      }
    },
    // speech input
    selectedSpeechInputFieldInput(input) {
      console.log("selected speech input field input", input, this.speechInputFields[this.selectedSpeechInputField]);
      this.speechInputFieldValues[this.selectedSpeechInputField] += input;
    },
    // cmd specific
    unselectSpeechInputFieldCmd(input) {
      console.log("unselect speech input field", input, this.selectedSpeechInputField, this.speechInputFields[this.selectedSpeechInputField]);
      this.speechInputFieldValues[this.selectedSpeechInputField] += input;
      this.speechInputFields[this.selectedSpeechInputField].ref.blur();
    },
    clearSpeechInputFieldCmd() {
      this.speechInputFieldValues[this.selectedSpeechInputField] = "";
    }
  }
};
</script>
