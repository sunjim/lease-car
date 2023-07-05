<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>{{ user.current }}</view>
    <uni-button type="success" class="flex" @click="clickMy">点击我注册</uni-button>
  </view>
</template>

<script setup lang="ts">

import { ref,reactive } from 'vue'
import { useCounterStore } from '@/stores/test';
import { login } from '@/api/login'
const title = ref('Hello')
const user = useCounterStore()
console.log(user.current)
const data = reactive({
			info:{
				name:'ssss',
				openid:'123456'
			}
		})
const clickMy = async()=>{
  user.current = 34
  const res = user.register(data.info)
  res.then(({data,message,code})=>{
    console.log('仓库返回数据',data,message,code)
  })
}
user.$subscribe((args,state)=>{
  console.log(state)
})

		// // 登录
		// const toLogin = async () => {
		// 	const res = await login(data.info)
    //   console.log('返回数据',res)
		// 	if(res.code == 200){
		// 		console.log('登录成功')
		// 	}else{
		// 		uni.showModal({
		// 			title:res.message,
		// 			showCancel:false
		// 		})
		// 	}
		// }

</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
