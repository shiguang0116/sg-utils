/**
 * @description: node服务配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2019-04-10 10:02:24
 */

const express = require('express')
const bodyParser = require('body-parser') // post请求方式取参
const path = require('path')
// const fs = require('fs')

function resolve(_path) {
    return path.resolve(__dirname, './' + _path)
}

var app = express()
var host = '127.0.0.1' // 设置主机名
var port = 4321 // 设置端口
var openPage = '/example/index.html' // 默认打开页面

// 访问静态文件
app.use('/example', express.static('example'))
app.use('/src', express.static('src'))

// 接口路由
var router = express.Router()
// app.use('/', router.get('/', function(req, res, next) {
//     res.send({"aa":resaa});
// }))

app.get('/', (req, res) => res.sendFile(__dirname + '/' + openPage))

// 处理请求参数
app.use(bodyParser.json({ strict: false, type: 'text/plain' }))

// // 设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With')
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     res.header('X-Powered-By', 'X-Generator')
//     res.header('Content-Type', 'application/json;charset=utf-8')

//     next()
// })

// 接口编写
var json = require('./example/index.json')
var json2 = require('./example/index2.json')
app.post('/api/getData', function(req, res) {
    const ret = { status: 'SUCCESS' }
    try {
        ret.data = json.data
    }
    catch (e) {
        ret.status = 500
        ret.message = `<pre>${e.stack}</pre>`
    }
    res.write(JSON.stringify(ret))
    res.end()
})
app.post('/api/getData2', function(req, res) {
    const ret = { status: 'SUCCESS' }
    try {
        ret.data = json2.data
    }
    catch (e) {
        ret.status = 500
        ret.message = `<pre>${e.stack}</pre>`
    }
    res.write(JSON.stringify(ret))
    res.end()
})

// 开启服务
app.listen(port, function() {
    console.log('\x1B[36m%s\x1B[0m', `服务器运行在: \n - http://${host}:${port} \n - http://${host}:${port}${openPage}`)
})

module.exports = app
