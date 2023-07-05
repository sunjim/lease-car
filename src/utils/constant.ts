import { stringify } from 'zipson';
// import.meta.env.MODE: {string} 应用运行的模式。

// import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。

// import.meta.env.PROD: {boolean} 应用是否运行在生产环境。

// import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。

// import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

var SERVER_URL:string = ''
if(import.meta.env.PROD){
    SERVER_URL = 'product.com'
}else{
    SERVER_URL = 'development.com'
}
export default SERVER_URL