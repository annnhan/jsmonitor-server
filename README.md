
## 项目简介

凡普信贷 node.js 项目代码模板，server 基于 [hapi.js](https://hapijs.com/) , 前端基于 jquery/zepto 搭建。

## 目录说明

    .
    ├── README.md                     
    ├── app.js                      server 入口 
    ├── bin                         启动命令脚本目录
    │   ├── dev.js                      开发环境启动脚本  
    │   ├── pro.js                      生产环境启动脚本
    │   └── test.js                     测试环境启动脚本
    ├── config                       server 端配置文件目录
    │   ├── base.js                     基础配置
    │   ├── dev.js                      开发环境配置
    │   ├── pro.js                      生产环境配置
    │   └── test.js                     测试环境配置
    ├── controller                  server controller 目录，一个文件对应一条 route
    │   ├── index.js        
    │   └── static
    ├── model                       server model 目录，用于处理数据
    │   └── job.js
    ├── package.json
    ├── static                      前端静态资源目录
    │   ├── common                      公共模块
    │   ├── favicon.ico             
    │   ├── home                        home（首页）的静态资源
    │   ├── public                      不需 webpack 构建的第三方静态资源
    │   ├── webpack-utils.js        
    │   ├── webpack.base.conf.js        webpack 基础配置
    │   ├── webpack.dev.conf.js         webpack 开发环境配置
    │   ├── webpack.pro.conf.js         webpack 生产环境配置
    │   └── webpack.test.conf.js        webpack 测试环境配置
    ├── utils                       server 工具类代码目录
    │   ├── client.js
    │   ├── micro-service.js
    │   └── route.js
    └── view                        server view 层目录，页面模板为 handlebars
        ├── helper                      handlebars helper 目录
        ├── layout                      页面 layout
        ├── mobile                      移动端页面模板
        └── web                         PC 端页面模板