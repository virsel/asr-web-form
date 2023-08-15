<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          aria-label="Menu"
          dense
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          Webmakler
        </q-toolbar-title>

        <div class="q-mx-md">
          <q-select
            v-model="lang"
            :label="$t('langSelect')"
            :options="langOptions"
            borderless
            color="grey-1"
            dark
            dense
            emit-value
            label-color="grey-1"
            map-options
            options-dense
            standout
            style="min-width: 150px"
          />
        </div>
        <FieldSelectiveSpeechInput></FieldSelectiveSpeechInput>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="400"
      bordered
      content-class="bg-grey-2"
      show-if-above
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item clickable to="/">
            <q-item-section avatar>
              <q-icon name="domain_add"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t('newEstateText') }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="statics/company-logo.jpg" style="height: 150px" fit="cover">
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import FieldSelectiveSpeechInput from '../components/FieldSelectiveSpeechInput'

export default {
  name: 'MainLayout',
  components: { FieldSelectiveSpeechInput },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'de-DE', label: 'Deutsch' }
      ]
    }
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style>
</style>
