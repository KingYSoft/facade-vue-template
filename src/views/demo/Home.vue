<template>
  <div class="home">
    <img alt="Vue logo"
         src="../../assets/logo.png" />
    <HelloWorld msg="欢迎使用facade vue框架" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import app from '../../utils/app'
import { config } from '../../utils/config'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public async created() {
    await this.initSocket()
  }
  // public async mounted() {}
  public async initSocket() {
    const baseUrl = config.BaseUrl + '/signalr'
    const token = ''
    const qs = 'enc_auth_token=' + encodeURIComponent(token)
    const c = await app.socket.connect(baseUrl, qs)

    // 接受websocket 消息
    app.socket.receiveMessage('DemoReceived', (name, message) => {
      console.log(name)
      console.log(message)
    })
    // 发送websocket 消息
    app.socket.sendMessage('Demo', 'jjj').then((res) => {
      console.log(res)
    })
  }
}
</script>
