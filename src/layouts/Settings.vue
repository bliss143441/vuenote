<template>
  <div class="container">
    <div class="row q-pa-sm animated fadeInDown shadow-1">
      <div class="col-12">
        <q-btn
          no-caps rounded dense
          icon="chevron_left"
          label="Back"
          color="positive"
          @click="cancel()"
        />
      </div>
    </div>

    <div class="window-content animated fadeInUp">
      <div class="q-pa-md" style="width: 100vw;">
        <h1>{{ packageInfo.productName }}</h1>

        <br>

        <!-- REPLACE -->
        <div>
          <label>Replace</label>

          <div class="float-right">
            <q-btn-group rounded>
              <q-btn
                no-caps rounded dense
                label="Reset"
                color="secondary"
                @click="resetReplace()"
              />
              <q-btn
                no-caps rounded dense
                label="Disable"
                color="negative"
                v-if="settings.replace"
                @click="settings.replace = false; save()"
              />
              <q-btn
                no-caps rounded dense
                label="Enable"
                color="primary"
                v-if="!settings.replace"
                @click="settings.replace = true; save()"
              />
            </q-btn-group>
          </div>

          <table>
            <thead>
              <th>Input</th>
              <th>Result</th>
            </thead>
            <tbody>
              <tr
                v-for="(value, index) in settings.replaceList"
                :key="index"
              >
                <td>{{ index }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br>

        <!-- IMPORT -->
        <json-import></json-import>

        <br>

        <!-- EXPORT -->
        <json-export></json-export>
      </div>
    </div>
  </div>
</template>

<script>
import JsonExport from '../components/JsonExport'
import JsonImport from '../components/JsonImport'
import Storage from '../services/Storage'

export default {
  components: {
    JsonExport,
    JsonImport
  },

  data () {
    return {
      packageInfo: require('../../package.json'),

      settings: Storage.load('settings')
    }
  },

  methods: {
    cancel () {
      this.$router.push('/')
    },

    save () {
      Storage.save('settings', this.settings)
    },

    resetReplace () {
      this.settings.replaceList = Storage.getStructur().settings.replaceList
    }
  }
}
</script>

<style>
</style>
