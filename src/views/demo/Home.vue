<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="欢迎使用facade vue框架" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import app from '../../utils/app'
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public async mounted() {
    await this.initSocket()
    app.socket.receiveMessage('DemoReceived', (name, message) => {
      console.log(name)
      console.log(message)
    })
  }
  public async initSocket() {
    const baseUrl = 'http://39.98.48.213:8001/pims/signalr'
    const token = ''
    const qs = 'enc_auth_token=' + encodeURIComponent(token)
    const c = await app.socket.connect(baseUrl, qs)
    app.socket.sendMessage('Demo', 'jjj').then((res) => {
      console.log(res)
    })
  }
}
</script>
