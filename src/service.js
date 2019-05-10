/**
 * @description: 服务类工具
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2019-02-25 09:42:58
 */
'use strict'

;(function(window) {
    var s = {}

    /** ******************************************* config 配置 ***************************************************/

    s.config = {
        // api路径
        api_path: ''
        // api_path : {
        //     "web": "http://192.168.149.192:7096/web/",
        //     "admin": "http://192.168.149.192:7094/admin/",
        //     "img_upload": "http://192.168.149.192:7096/web/service/fileService/uploadFile",
        //     "img_path": "http://192.168.149.36:9527/dev1.0.5/image/",
        // },
    }

    /** ******************************************* 统一处理 ***************************************************/

    /**
     * @description 返回首页
     */
    s.goHome = function() {
        window.location.href = './index.html'
    }

    /**
     * @description 统一登录处理
     * @param {Boolean} isReferrer 是否需要跳回，默认false
     * @param {String} referrerURL 登录成功之后跳回的地址，默认当前页面路径
     */
    s.doLogin = function(isReferrer, referrerURL) {
        if (isReferrer) {
            return _util.url.jumpFromReferrer('./login.html', referrerURL)
        }
        window.location.href = './login.html'
    }

    /**
     * @description 成功提示
     */
    s.successTip = function(msg) {
        alert(msg)
    }

    /**
     * @description 错误提示
     */
    s.errorTip = function(msg) {
        alert(msg)
    }

    /** ******************************************* api 请求 ***************************************************/

    s.api = {}

    /**
     * @description 异步请求，这里使用了es6的promise对象（以 jQuery 为例）
     * @param {String} apiName 请求路径名
     * @param {Object} data 请求数据
     * @param {Object} option 其他请求参数及处理参数等 (method/type/ignoreLoading/ignoreError)
     */
    s.request = function(apiName, data, option) {
        var url = s.api.getPath(apiName)
        data = data || {}
        option = option || {}
        // 是否忽略加载动画
        if (option.ignoreLoading !== true) {
            console.log('数据加载中...')
        }
        // 发送请求并返回promise对象
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                data: data,
                type: option.type || 'POST',
                dataType: option.dataType || 'json',
                success: function(res) {
                    if (option.ignoreError !== true && res.status === 'FAIL') { // 请求数据失败的处理
                        var msg = res.MESSAGE || '数据异常'
                        s.errorTip(msg)
                    }
                    resolve(res) // 成功回调
                },
                error: function(err) {
                    s.errorTip('网络访问失败：' + err.statusText) // 请求失败的错误处理
                    reject(new Error(err.statusText)) // 失败回调
                },
                complete: function(res) {
                    if (option.ignoreLoading !== true) {
                        console.log('数据加载完毕')
                    }
                }
            })
        })
    }

    /**
     * @description 获取URL请求的地址
     * @param {String} apiName 接口名
     * @param {String} moduleType 接口所属模块
     */
    s.api.getPath = function(apiName) {
        return s.config.api_path + apiName
    }

    /**
     * @description 创建标准的查询条件对象
     * @param search_data 查询条件
     * @param search_data_operator 查询条件比较符
     * @param page_data 分页对象
     * @param order_data 排序字段
     * @param ignoreFields 忽略掉的字段
     * @returns {Object} 标准的查询条件对象
     */
    s.api.buildParams = function(search_data, search_data_operator, page_data, order_data, ignoreFields) {
        var params = {
            filter_fields: [],
            order_fields: [],
            page_size: -1,
            page_index: -1
        }
        // 处理参数

        return params
    }

    /** ******************************************* user 用户 ***************************************************/

    s.user = {}

    /**
     * @description 初始用户信息
     * @param {Object} user 用户数据
     * @param {Boolean} rememberPwd 是否记住密码
     */
    s.user.init = function(user, rememberPwd) {
        var expireDays = rememberPwd ? 7 : 0.25 // cookie过期时间 默认6小时；如果记住密码，则7天

        _util.cookie.set('user_id', user.userId, expireDays)
        _util.cookie.set('user_name', user.userName, expireDays)
        _util.cookie.set('is_login', '1', expireDays)
    }

    /**
     * 用户登入
     */
    s.user.login = function(param) {
        s.request('service/userService/login', param).then(function(res) {
            if (res.status === 'SUCCESS') {
                s.user.init(res.data.user, param.rememberPwd)
            }
        })
    }

    /**
     * 用户登出
     */
    s.user.logout = function() {
        s.request('service/userService/logout').then(function(res) {
            if (res.status === 'SUCCESS') {
                // 清空本地存储
                _util.cookie.remove('user_id')
                _util.cookie.remove('user_name')
                _util.cookie.remove('is_login')
                _util.storage.clear()
            }
        })
    }

    /**
     * 判断用户是否登陆
     */
    s.user.isLogin = function() {
        return _util.cookie.get('is_login') === '1'
    }

    /** ******************************************* menu 菜单 ***************************************************/

    s.menu = {}

    /** ******************************************* enumeration 枚举 ***************************************************/

    s.enumeration = {
        bill_status: { '0': '初始', '1': '提交', '2': '审核' }
    }

    window._sv = s
})(window)
