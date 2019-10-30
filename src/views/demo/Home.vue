<template>
  <div class="home">
    <img alt="Vue logo"
         src="../../assets/logo.png">
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
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwMDA1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Iua1i-ivlTEiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiIxIiwic3ViIjoiMTAwMDUiLCJqdGkiOiJhNWJiOTY2NS00NzEwLTQ3NWMtOTA5ZS04ZDZiNjU2NTZiYmIiLCJpYXQiOjE1NzI0MDQ5NzAsIm5iZiI6MTU3MjQwNDk3MCwiZXhwIjoxNTcyNDkxMzcwLCJpc3MiOiJQaW1zIiwiYXVkIjoiUGltcyJ9.aMrJ_M40r1TY8unUiderid5CGBTLSl845pXvNjAX8Ec'
    const qs = 'enc_auth_token=' + encodeURIComponent(token)
    const c = await app.socket.connect(baseUrl, qs)
    app.socket.sendMessage('Demo', 'jjj').then((res) => {
      console.log(res)
    })
  }
}
</script>
