// stores/counter.js
import { defineStore } from 'pinia';
import { parse, stringify } from 'zipson'
import { Names } from './store-name';
import http from '@/utils/request/request'
import { login } from '../api/login';
import type {IUser,IWeather,IMap,IUserResult} from '@/interface/login' 
/*
修改 status
    2 test.$patch({current:111,name:'234'})
    3 test.$patch((state)=>{current:111,name:'234'})
    4 test.$state = {current:123,name:''}
    5 使用action 修改

*/
/*
    test.$onAction((args)=>{
        console.log()
    },true)
    test.$subscribe((arts,state)=>{

    })
*/
export const useCounterStore = defineStore(Names.TEST, {
	state: () => {
		return { 
            current:1,
            name:'sun'
         };
	},
    // computed
    getters:{

    },
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		increment() {
			this.current++;
		},
         async register(data:IUser){
             return await http.post('/api/user/store',data)
        }
	},
    // persist: false, 开启持久化
    persist:{
        key: 'my-custom-key',
        // storage: sessionStorage,
        // 该 store 中, 只有 save.me 和 saveMeToo 被持久化，而 save.notMe 不会被持久化。
        paths: ['count', 'saveMeToo'], 
        serializer: {
            deserialize: parse,
            serialize: stringify,
            },
    },
    
});