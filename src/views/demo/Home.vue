<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="欢迎使用facade vue框架" />
    <div class="text">测试文字</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { facade } from '../../services';

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  // public created() {}
  public async mounted() {
    // facade.speech.speak('患者,1,1,0,1,家属，请到谈话室')

    facade.event.on('facade.socket.connected', () => {
      console.log('websocket 连接成功');
    });

    await this.initSocket();
  }
  public async initSocket() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEwMDA0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Iui1teW5s-W5syIsImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjEiLCJzdWIiOiIxMDAwNCIsImp0aSI6ImViN2NmNzUxLWY4NTktNDJiYi04NWQ2LWI2ZWU5MGJlNzQzZiIsImlhdCI6MTU4NjMzOTkzNiwibmJmIjoxNTg2MzM5OTM2LCJleHAiOjE2MTc4NzU5MzYsImlzcyI6IlBpbXMiLCJhdWQiOiJQaW1zIn0.xvKX1y1dprkx87oGQpl3nZF86-pALzGEGLsgejHSNIo';
    const qs = 'enc_auth_token=' + encodeURIComponent(token);
    await facade.socket.connect(facade.config.SOCKET_BASE_URL, qs);

    // 接受websocket 消息
    facade.socket.receiveMessage('DemoReceived', (name, message) => {
      console.log(name);
      console.log(message);
    });
    // 发送websocket 消息
    facade.socket.sendMessage('Demo', 'jjj').then(res => {
      console.log(res);
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  .text {
    margin: 20px 0;
    color: $--color-primary;
  }
}
</style>
