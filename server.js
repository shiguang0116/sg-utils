/**
 * @description: node服务配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-04-10 10:02:24 
 */

var http = require('http');
var path = require('path');
var fs = require('fs');

// 参数配置
var host = '127.0.0.1'; // 设置主机名
var port = 8080;        // 设置端口
var openPage = '/demo/demo.html';   // 默认打开的页面
var rootPath = path.resolve(__dirname, './'); // 文件的访问路径

// 创建服务
var server = http.createServer(function (req, res) {
    var url = req.url === '/' ? openPage : req.url;  // 客户端输入的url，如：输入 localhost:8080/index.html，那么 url = '/index.html'
    var file = rootPath + url;  // 访问的文件路径
    // console.log(file);

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

// 输入命令 node server.js 启动服务
server.listen(port, host, function(){
    console.log(`服务器运行在 http://${host}:${port}`);
});