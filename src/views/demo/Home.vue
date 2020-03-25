<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="欢迎使用facade vue框架" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { APP } from '../../utils/app'
import { BASE_URL, SOCKET_BASE_URL } from '../../utils/config'
import { formatDate } from '../../utils/utils'
@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public created() {
    // await this.initSocket()
  }
  public mounted() {
    // APP.speech.speak('患者,1,1,0,1,家属，请到谈话室')
  }
  public async initSocket() {
    const token = ''
    const qs = 'enc_auth_token=' + encodeURIComponent(token)
    const c = await APP.socket.connect(SOCKET_BASE_URL, qs)

    // 接受websocket 消息
    APP.socket.receiveMessage('DemoReceived', (name, message) => {
      console.log(name)
      console.log(message)
    })
    // 发送websocket 消息
    APP.socket.sendMessage('Demo', 'jjj').then((res) => {
      console.log(res)
    })
  }
}
</script>
