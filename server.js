/**
 * @description: node服务配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-04-10 10:02:24 
 * 
 * 启动服务:  node server
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

// 参数配置
const host = '127.0.0.1';   // 设置主机名
const port = 8080;          // 设置端口
const openPage = '/demo/demo.html';             // 默认打开的页面
const rootPath = path.resolve(__dirname, './'); // 文件的访问路径

// 创造一个服务器实例（req:客户端的HTTP请求 | res:服务器端的HTTP回应）
const server = http.createServer(function (req, res) {
    const url = req.url;            // 客户端输入的url，如：输入 localhost:8080/index.html，那么 url = '/index.html'
    const file = rootPath + url;    // 访问的文件路径

    fs.readFile(file, function (err, data) {
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        } else {
            res.writeHeader(200, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write(data);
            res.end();
        }
    });
});

// 启动服务器监听指定端口
server.listen(port, host, function(){
    console.log('\x1B[36m%s\x1B[39m', `服务器运行在: \n - http://${host}:${port} \n - http://${host}:${port}${openPage}`);
});