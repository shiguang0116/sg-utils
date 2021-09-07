/**
 * @description: js通用工具类
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2018-12-13 15:38:27
 */
'use strict'

;(function(window) {
    var u = {}

    /** ******************************************* cookie 缓存 ***************************************************/

    u.cookie = {}

    /**
     * @description 设置缓存
     * @param {String} name 缓存数据的名字
     * @param {*} value 缓存数据的值
     * @param {Number} expiredays 缓存数据的时间（天），默认关闭浏览器时失效。1/24 表示一个小时，1/24/60 表示一分钟
     */
    u.cookie.set = function(name, value, expiredays) {
        var expires = ''
        if (expiredays) {
            var exdate = new Date()
            exdate.setTime(exdate.getTime() + expiredays * (24 * 3600 * 1000))
            expires = 'expires=' + exdate.toUTCString()
        }
        document.cookie = name + '=' + escape(value) + ';' + expires
    }

    /**
     * @description 获取缓存的数据
     * @param {String} name 要获取的数据对应的名字
     * @return {*}
     */
    u.cookie.get = function(name) {
        var arr = document.cookie.split('; ')
        for (var i = 0, len = arr.length; i < len; i++) {
            var temp = arr[i].split('=')
            if (temp[0] === name) return unescape(temp[1])
        }
        return null
    }

    /**
     * @description 删除缓存中某些数据
     * @param {String} name 要删除的数据对应的名字
     */
    u.cookie.remove = function(name) {
        u.cookie.set(name, '', -1)
    }

    /** ****************************************** localStorage 本地储存 **************************************************/

    u.storage = {}

    /**
     * @description 获取localStorage对象，兼容android（android原生系统老系统不支持localstorage）
     * @return localStorage对象
     */
    function uzStorage() {
        var ls = window.localStorage
        var isAndroid = (/android/gi).test(window.navigator.appVersion)
        if (isAndroid) ls = os.localStorage()
        return ls
    }

    /**
     * @description 设置本地储存
     * @param {String} key 储存的名字
     * @param {*} value 储存的值
     */
    u.storage.set = function(key, value) {
        var v = value
        var ls = uzStorage()
        if (typeof v === 'object') {
            v = JSON.stringify(v)
            v = 'obj-' + v
        }
        if (ls) ls.setItem(key, v)
    }

    /**
     * @description 获取本地储存的数据
     * @param {String} key 要获取的数据对应的名字
     * @return {*}
     */
    u.storage.get = function(key) {
        var ls = uzStorage()
        if (ls) {
            var v = ls.getItem(key)
            if (!v) return
            if (v.indexOf('obj-') === 0) return JSON.parse(v.slice(4))
            else return v
        }
    }

    /**
     * @description 删除本地储存中某些数据
     * @param {String} key 要删除的数据对应的名字
     */
    u.storage.remove = function(key) {
        var ls = uzStorage()
        if (ls && key) ls.removeItem(key)
    }

    /**
     * @description 清空本地储存的所有数据
     */
    u.storage.clear = function() {
        var ls = uzStorage()
        if (ls) ls.clear()
    }

    /** ****************************************** 数据类型 ***************************************************/

    /**
     * @description 判断元素是否为字符串
     * @param {*} source
     * @return {Boolen}
     */
    u.isString = function(source) {
        return typeof source === 'string'
    }

    /**
     * @description 判断元素是否为数组
     * @param {*} source
     * @return {Boolen}
     */
    u.isArray = function(source) {
        if (Array.isArray) return Array.isArray(source)
        else return source instanceof Array
    }

    /**
     * @description 判断元素是否为对象
     * @param {*} source
     * @return {Boolen}
     */
    u.isObject = function(source) {
        return Object.prototype.toString.call(source) === '[object Object]'
    }

    /**
     * @description 判断元素是否为函数
     * @param {*} source
     * @return {Boolen}
     */
    u.isFunction = function(source) {
        return typeof source === 'function'
    }

    /**
     * @description 判断元素是否为空
     * @param {*} source
     * @return {Boolen}
     */
    u.isEmpty = function(source) {
        if (source === undefined || source === null) return true
        if (u.isString(source) || u.isArray(source)) return source.length === 0
        if (u.isObject(source)) return JSON.stringify(source) === '{}'
        else return source.toString().length === 0
    }

    /**
     * @description 遍历数组、对象
     * @param {*} source 对象或数组
     * @param {Function} func 执行函数，function(i, item) 或 function(key, value)。执行函数返回 false 时，循环终止。
     */
    u.forEach = function(source, func) {
        if (source === undefined || source === null) return
        if (typeof (func) !== 'function') return

        var flag
        if (u.isObject(source)) {
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    flag = func.apply(window, [key, source[key]])
                    if (flag === false) break
                }
            }
        }
        else {
            for (var i = 0, len = source.length; i < len; i++) {
                flag = func.apply(window, [i, source[i]])
                if (flag === false) break
            }
        }
    }

    /**
     * @description 判断两个元素是否相等
     * @param {*} source1
     * @param {*} source2
     * @param {Boolean} ignoreCase 是否忽略掉大小写，不传则为false
     * @param {Boolean} ignoreSort 是否忽略排序，不传则为false
     * @return {Boolean} 是否相等
     */
    u.equal = function(source1, source2, ignoreCase, ignoreSort) {
        u.prop_equal = true
        // 同为数组或同为对象
        if ((u.isArray(source1) && u.isArray(source2)) || (u.isObject(source1) && u.isObject(source2))) {
            if (u.isArray(source1)) {
                if (source1.length !== source2.length) {
                    u.prop_equal = false
                    return false
                }
                if (ignoreSort) {
                    source1.sort()
                    source2.sort()
                }
            }
            else {
                if (u.length(source1) !== u.length(source2)) {
                    u.prop_equal = false
                    return false
                }
            }

            u.forEach(source1, function(ikey, item) {
                return u.equal(item, source2[ikey], ignoreCase, ignoreSort)
            })
            return u.prop_equal
        }
        // 字符串
        else {
            if (ignoreCase) {
                source1 = String.prototype.toLowerCase.call(source1.toString())
                source2 = String.prototype.toLowerCase.call(source2.toString())
            }
            if (source1 !== source2) u.prop_equal = false
            return u.prop_equal
        }
    }

    /**
     * @description 复制对象或数组（深拷贝）
     * @param {*} source 源数据
     * @return {*}
     */
    u.copy = function(source) {
        var ret
        if (u.isObject(source)) {
            ret = {}
            u.forEach(source, function(key, value) {
                if (u.isObject(value) || u.isArray(value)) {
                    value = u.copy(value)
                }
                ret[key] = value
            })
        }
        else if (u.isArray(source)) {
            ret = []
            u.forEach(source, function(i, item) {
                if (u.isObject(item) || u.isArray(item)) {
                    item = u.copy(item)
                }
                ret.push(item)
            })
        }
        else return source
        return ret
    }

    /**
     * @description 扩展对象（深拷贝）
     * @param {Object} target 目标对象
     * @param arguments 后面的属性会覆盖掉前面的
     */
    u.extend = function(target) {
        if (!u.isObject(target)) return

        for (var i = 1, len = arguments.length; i < len; i++) {
            var nextObj = arguments[i]
            if (u.isObject(nextObj)) {
                u.forEach(nextObj, function(key, value) {
                    if (u.isObject(value) || u.isArray(value)) {
                        value = u.copy(value)
                    }
                    target[key] = value
                })
            }
        }
        return target
    }

    /**
     * @description 判断元素的长度
     * @param {*} source
     * @return {Number}
     */
    u.length = function(source) {
        if (source === undefined || source === null) return 0
        if (u.isString(source) || u.isArray(source)) return source.length
        if (u.isObject(source)) {
            var len = 0
            u.forEach(source, function(key, value) {
                len++
            })
            return len
        }
    }

    /** ****************************************** string 字符串 ***************************************************/

    u.string = {}

    /**
     * @description 去除字符串前后空格
     * @param {String} str
     * @return {String} 去除空格之后的字符串
     */
    u.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    }

    /**
     * @description 去除字符串所有空格
     * @param {String} str
     * @return {String} 去除空格之后的字符串
     */
    u.trimAll = function(str) {
        return str.replace(/\s*/g, '')
    }

    /**
    * @description 格式化字符串（文本替换）
    * @param {String} str 源字符串。如：'确定要{0}单据【{1}】吗？'
    * @param {*} args 要替换的参数。如：'删除', 'QZYDYJZB201901300002'
    * @return {String} 如：'确定要删除单据【QZYDYJZB201901300002】吗？'
    */
    u.string.format = function(str, args) {
        for (var i = 1, len = arguments.length; i < len; i++) {
            var reg = new RegExp('\\{' + (i - 1) + '\\}', 'gm')
            arguments[0] = arguments[0].replace(reg, arguments[i])
        }
        return arguments[0]
    }

    /**
     * @description 判断字符串是否以指定字符串开头
     * @param {String} str 源字符串
     * @param {String} searchString 要查询的字符串
     * @param {Boolean} ignoreCase 是否忽略大小写，默认false
     * @return {Boolean}
     */
    u.string.isStartWith = function(str, searchString, ignoreCase) {
        if (str === null || str === undefined) return false
        var preSubStr = str.substring(0, searchString.length) + ''
        if (ignoreCase) {
            preSubStr = preSubStr.toLowerCase()
            searchString = (searchString + '').toLowerCase()
        }
        return preSubStr === searchString
    }

    /**
     * @description 判断字符串是否以指定字符串结束
     * @param {String} str 源字符串
     * @param {String} searchString 要查询的字符串
     * @param {Boolean} ignoreCase 是否忽略大小写，默认false
     * @return {Boolean}
     */
    u.string.isEndWith = function(str, searchString, ignoreCase) {
        if (str === null || str === undefined) return false
        var lastSubStr = str.substring(str.length - searchString.length, str.length) + ''
        if (ignoreCase) {
            lastSubStr = lastSubStr.toLowerCase()
            searchString = (searchString + '').toLowerCase()
        }
        return lastSubStr === searchString
    }

    /**
     * @description 首字母小写
     * @param {String} str 源字符串
     * @return {String}
     */
    u.string.firstLowerCase = function(str) {
        if (u.isEmpty(str)) return ''
        return str.replace(/^\S/, function(s) { return s.toLowerCase() })
    }

    /**
     * @description 首字母大写
     * @param {String} str 源字符串
     * @return {String}
     */
    u.string.firstUpperCase = function(str) {
        if (u.isEmpty(str)) return ''
        return str.replace(/^\S/, function(s) { return s.toUpperCase() })
    }

    /**
     * @description 反转字符串的元素顺序
     * @param {String} str 源字符串
     * @return {String}
     */
    u.string.reverse = function(str) {
        if (u.isEmpty(str)) return ''

        var newStr = ''
        for (var i = str.length - 1; i >= 0; i--) {
            newStr += str[i]
        }
        return newStr
    }

    /**
     * @description 复制文本到剪切板
     * @param text {String} 需要复制的文本内容
     */
    u.string.copy = function(text) {
        var input = window.document.createElement('input')
        input.value = text
        input.select()
        window.document.execCommand('copy')
    }

    /**
     * @description 字母和数字混合的编号自加1（以数字结尾）
     * @param {String} code 编号。例：'XM0001'
     * @return {String} 编号+1。例：'XM0002'
     */
    u.string.getNext = function(code) {
        var part1, part2
        if (/[a-z]/i.test(code)) {
            var x = code.match(/[a-z]/ig)
            part1 = x.join('')
            part2 = code.substring(x.length)
        }
        else {
            part1 = ''
            part2 = code
        }
        var int = parseInt(part2)
        var zero = (part2 + '.').split(int + '.')[0]
        var newPart2 = zero + (int + 1).toString()
        return part1 + newPart2
    }

    /** ******************************************* number 数字 ***************************************************/

    u.number = {}

    /**
     * @description 转换成int类型
     * @param {String Number} input 输入的数
     * @param {Number} defaultValue 转换失败时的默认值
     * @return {int}
     */
    u.number.parseInt = function(input, defaultValue) {
        var value = parseInt(input)
        if (isNaN(value) || Infinity === value) {
            defaultValue = defaultValue || 0
            return defaultValue
        }
        return value
    }

    /**
     * @description 转换成float类型
     * @param {String Number} input 输入的数
     * @param {Number} defaultValue 转换失败时的默认值
     * @return {float}
     */
    u.number.parseFloat = function(input, defaultValue) {
        var value = parseFloat(input)
        if (isNaN(value) || Infinity === value) {
            defaultValue = defaultValue || 0
            return defaultValue
        }
        return value
    }

    /**
     * @description 保留几位小数（四舍五入法）
     * @param {String Number} input 输入的数
     * @param {String Number} digits 小数位数，默认 2
     * @return {String}
     */
    u.number.toFixed = function(input, digits) {
        digits = digits || 2
        input = u.number.parseFloat(input, 0)
        if (input === 0) return 0
        return input.toFixed(digits)
    }

    /**
     * @description 保留几位小数（进一法）
     * @param {String Number} input 输入的数
     * @param {String Number} digits 小数位数，默认 2
     * @return {String}
     */
    u.number.ceil = function(input, digits) {
        digits = digits || 2
        var num = Math.ceil(input * Math.pow(10, digits)) / Math.pow(10, digits)
        return u.number.toFixed(num, digits)
    }

    /**
     * @description 保留几位小数（舍一法）
     * @param {String Number} input 输入的数
     * @param {String Number} digits 小数位数，默认 2
     * @return {String}
     */
    u.number.floor = function(input, digits) {
        digits = digits || 2
        var num = Math.floor(input * Math.pow(10, digits)) / Math.pow(10, digits)
        return u.number.toFixed(num, digits)
    }

    /**
     * @description 获取两个数之间的随机数
     * @param {Number} min
     * @param {Number} max
     * @return {Number}
     */
    u.number.random = function(min, max) {
        var random = 0
        random = min + Math.random() * (max - min)
        return Math.round(random)
    }

    /**
     * @description 多个数相加
     * @param {Number String} args 加数
     * @return {Number} 和
     */
    u.number.add = function(args) {
        var m = 0
        var ret = 0
        for (var i = 0, len = arguments.length; i < len; i++) {
            arguments[i] = arguments[i].toString()
            try {
                m += arguments[i].split('.')[1].length
            }
            catch (e) {
                m += 0
            }
        }
        for (var j = 0, leng = arguments.length; j < leng; j++) {
            ret = arguments[j] * Math.pow(10, m) + ret
        }
        ret = ret / Math.pow(10, m)
        return ret
    }

    /**
     * @description 多个数相乘
     * @param {Number String} args 乘数
     * @return {Number} 积
     */
    u.number.mul = function(args) {
        var m = 0
        var ret = 1
        for (var i = 0, len = arguments.length; i < len; i++) {
            arguments[i] = arguments[i].toString()
            try {
                m += arguments[i].split('.')[1].length
            }
            catch (e) {
                m += 0
            }
            ret = arguments[i].replace('.', '') * ret
        }
        ret = ret / Math.pow(10, m)
        return ret
    }

    /**
     * @description 转化成货币格式（千分位）
     * @param {Number String} num 源数据
     * @param {String Number} digits 小数位数，默认不处理
     * @return {String}
     */
    u.number.toCurrency = function(input, digits) {
        input = input + ''
        if (digits) input = u.number.toFixed(input, digits)
        if (input.indexOf('.') === -1) input += '.'

        return input.replace(/(\d)(?=(\d{3})+\.)/g, function($1) {
            return $1 + ','
        }).replace(/\.$/, '')
    }

    /** ******************************************* array 数组 ***************************************************/

    u.array = {}

    /**
     * @description 检索数组（子元素为数组、对象、字符串等）
     * @param {Array} source [''] [[]] [{}]
     * @param {*} searchElement 当子元素为对象时，只用匹配该对象的某一个（几个）属性即可
     * @return {Number} 索引 或 -1
     */
    u.array.indexOf = function(source, searchElement) {
        var index = -1
        // 子元素为对象
        if (u.isObject(searchElement)) {
            u.forEach(source, function(i, item) {
                var isHas = true
                u.forEach(searchElement, function(searchKey, searchValue) {
                    if (item[searchKey]) {
                        if (!u.equal(item[searchKey], searchValue)) {
                            isHas = false
                            return false
                        }
                    }
                    else {
                        isHas = false
                    }
                })
                if (isHas) {
                    index = i
                    return false
                }
            })
            return index
        }
        // 子元素为数组
        if (u.isArray(searchElement)) {
            u.forEach(source, function(i, item) {
                if (u.equal(item, searchElement)) {
                    index = i
                    return false
                }
            })
            return index
        }
        // 子元素为字符串
        else {
            return source.indexOf(searchElement)
        }
    }

    /**
     * @description 向数组的末尾添加一个或多个元素，并返回新的长度
     * @param {Array} target 目标数组
     * @param {Array} array 要添加的数组
     * @return {Number} 新数组的长度
     */
    u.array.push = function(target, array) {
        if (u.isEmpty(array)) return target
        if (!u.isArray(array)) array = [array]
        return Array.prototype.push.apply(target, array)
    }

    /**
     * @description 对数组排序
     * @param {Array} array 源数组 [{}]
     * @param {String} sortKey 排序字段
     * @param {String} order 排序方式，asc升序，desc降序，默认为升序
     * @return {Array} 排序后的新数组
     */
    u.array.sort = function(array, sortKey, order) {
        if (u.isEmpty(array)) return []
        var ret = array.concat([])
        order = order || 'asc'
        ret.sort(function(a, b) {
            var aVal = a[sortKey]
            var bVal = b[sortKey]
            if (aVal > bVal) return order === 'asc' ? 1 : -1
            else if (aVal < bVal) return order === 'asc' ? -1 : 1
            return 0
        })
        return ret
    }

    /**
     * @description 数组去重（子元素为数组、对象、字符串等）
     * @param {Array} array [''] [[]] [{}]
     * @param {String Array} keys 根据属性去重（针对子元素是对象时）
     * @param {Boolean} ignoreSort 是否忽略排序（针对子元素是数组时）
     * @return {Array}
     */
    u.array.unique = function(array, keys, ignoreSort) {
        var ret = []
        u.forEach(array, function(i, item) {
            if (keys && u.isObject(item)) { // 根据属性去重，去掉排在末位的对象
                if (!u.isArray(keys)) keys = [keys]
                var searchObj = {}
                u.forEach(keys, function(i, selectKey) {
                    searchObj[selectKey] = item[selectKey]
                })
                if (u.array.indexOf(ret, searchObj) === -1) ret.push(item)
            }
            else if (ignoreSort && u.isArray(item)) {
                if (u.array.indexOf(ret, item.sort()) === -1) ret.push(item)
            }
            else {
                if (u.array.indexOf(ret, item) === -1) ret.push(item)
            }
        })
        return ret
    }

    /**
     * @description 筛选出符合条件的数组，生成新的数组
     * @param {Array} source 原数组 [{}]
     * @param {Object} filterProperty 条件对象 { status: ['1','2'] }
     * @param {Boolean} getDeleteData 是否返回被过滤掉的数组，默认false
     * @return {Array} 符合条件的数据 或 不符合条件的数据
     */
    u.array.filter = function(source, filterProperty, getDeleteData) {
        if (u.isEmpty(source) || u.isEmpty(filterProperty)) return []

        var ret = []
        var retByDelete = []
        u.forEach(source, function(i, item) {
            var equal = true
            u.forEach(filterProperty, function(filterKey, filterValue) {
                var itemValue = item[filterKey]
                if (!u.isArray(filterValue)) filterValue = [filterValue]
                if (filterValue.indexOf(itemValue) === -1) {
                    equal = false
                    return false
                }
            })
            if (equal) ret.push(item)
            else retByDelete.push(item)
        })
        if (getDeleteData) return retByDelete
        return ret
    }

    /**
     * @description 选择数组的子元素（对象）的一个（多个）属性
     * @param {Array} source 源数组 [{}]
     * @param {String Array} keys 属性（集合）
     * @return {Array} 新数组 [''] 或 [{}]
     */
    u.array.select = function(source, keys) {
        if (u.isEmpty(source) || u.isEmpty(keys)) return source

        var ret = []
        u.forEach(source, function(i, item) {
            if (u.isArray(keys)) {
                var obj = {}
                u.forEach(keys, function(j, key) {
                    obj[key] = u.object.getValue(item, key)
                })
                ret.push(obj)
            }
            else {
                ret.push(u.object.getValue(item, keys))
            }
        })
        return ret
    }

    /**
     * @description 合并两个数组，生成新的数组
     * @param {Array} source 原数组
     * @param {Array} array 待合并的数组
     * @param {String Array} keys 根据属性去重（针对子元素是对象时）
     * @param {Boolean} ignoreSort 是否忽略排序（针对子元素是数组时）
     * @return {Object}
     */
    u.array.concat = function(source, array, keys, ignoreSort) {
        if (u.isEmpty(source)) return array
        if (u.isEmpty(array)) return source

        var ret = []
        ret = source.concat(array)
        ret = u.array.unique(ret, keys, ignoreSort)
        return ret
    }

    /**
     * @description 对数组中的元素进行分组
     * @param {Array} array 数组
     * @param {Array} fields 分组的依据字段
     * @return {Array} 分组后的新数组
     */
    u.array.group = function(array, fields) {
        if (u.isEmpty(array) || u.isEmpty(fields)) return null

        var ret = []
        u.forEach(array, function(i, item) {
            if (!u.isArray(fields)) fields = [fields]

            var itemGroup = {}
            u.forEach(fields, function(i, field) {
                itemGroup[field] = item[field]
            })
            var index = u.array.indexOf(ret, itemGroup)
            if (index === -1) {
                itemGroup.group = []
                itemGroup.group.push(item)
                ret.push(itemGroup)
            }
            else {
                ret[index].group.push(item)
            }
        })
        return ret
    }

    /**
     * @description arraybuffer转string
     * @param source 原数据
     * @returns {string}
     */
     u.array.arraybufferToString = function(source) {
      const enc = new TextDecoder("utf-8");
      const uint8_msg = new Uint8Array(source);
      const decodedString = enc.decode(uint8_msg)
      return decodedString
    }

    /**
     * @description 删除数组中指定的元素或不合法的值（undefined, null, ''）
     * @param {Array} source 原数组
     * @param {*} values 被删除的元素集合，不传则删除不合法的值
     */
    u.array.remove = function(array, values) {
        if (u.isEmpty(array)) return []
        // 删除不合法的值
        if (u.isEmpty(values)) {
            var i = array.length
            while (i--) {
                var item = array[i]
                if (item === null || item === undefined || item === '') {
                    array.splice(i, 1)
                }
            }
        }
        // 删除指定的元素
        else {
            if (!u.isArray(values)) values = [values]
            u.forEach(values, function(i, value) {
                var index = u.array.indexOf(array, value)
                if (index > -1) array.splice(index, 1)
            })
        }
    }

    /**
     * @description 清空数组中的元素
     * @param {Array} array 源数组
     */
    u.array.clear = function(array) {
        if (u.isEmpty(array)) return

        array.splice(0, array.length)
    }

    /** ******************************************* object 对象 ***************************************************/

    u.object = {}

    /**
     * @description 获取对象的属性集合
     * @param {Object} obj 源对象
     * @return {Array} 属性名的数组
     */
    u.object.keys = function(obj) {
        if (u.isEmpty(obj)) return []

        return Object.keys(obj)
    }

    /**
     * @description 获取对象属性的值 的集合
     * @param {Object} obj 源对象
     * @return {Array} 属性值的数组
     */
    u.object.values = function(obj) {
        if (u.isEmpty(obj)) return []

        var ret = []
        try {
            ret = Object.values(obj)
        }
        catch (e) {
            u.forEach(obj, function(key, value) {
                ret.push(value)
            })
        }
        return ret
    }

    /**
     * @description 合并对象（ Object.assign() 拷贝的是属性值，不属于深拷贝。深拷贝请参考 u.extend() ）
     * @param {Object} target 目标对象
     * @param arguments 后面的属性会覆盖掉前面的
     */
    u.object.assign = function(target) {
        if (!u.isObject(target)) return

        try {
            Object.assign.apply(window, arguments)
        }
        catch (e) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                var nextObj = arguments[i]
                if (u.isObject(nextObj)) {
                    u.forEach(nextObj, function(key, value) {
                        target[key] = value
                    })
                }
            }
        }
    }

    /**
     * @description 选择对象中的一个（多个）属性
     * @param {Object} obj 源对象
     * @param {String Array} keys 属性名集合
     * @return {Object} 新对象
     */
    u.object.select = function(obj, keys) {
        if (u.isEmpty(obj) || u.isEmpty(keys)) return {}

        var ret = {}
        if (!u.isArray(keys)) keys = [keys]
        u.forEach(keys, function(i, key) {
            ret[key] = obj[key]
        })
        return ret
    }

    /**
     * @description 修改属性名
     * @param {Object} obj 要修改的对象
     * @param {String} oldKey 原来的属性名
     * @param {String} newKey 新的属性名
     * @param {Boolean} keepOld 是否保留旧的属性，默认为false
     */
    u.object.rename = function(obj, oldKey, newKey, keepOld) {
        if (u.isEmpty(obj)) return

        if (obj[oldKey]) {
            obj[newKey] = obj[oldKey]
            if (!keepOld) u.object.remove(obj, oldKey)
        }
    }

    /**
     * @description 获取对象的属性值（支持多层数据）
     * @param {Object} obj 对象
     * @param {String} propertyName 属性名 'data.child.name'
     * @param {Boolean} ignoreCase 忽略属性名大小写，默认false
     */
    u.object.getValue = function(obj, propertyName, ignoreCase) {
        var propertyValue = null
        if (!obj) return propertyValue
        if (u.isEmpty(propertyName)) return propertyValue

        var pointIndex = propertyName.indexOf('.')
        if (pointIndex > -1) {
            obj = obj[propertyName.substring(0, pointIndex)]
            return u.object.getValue(obj, propertyName.substring(pointIndex + 1), ignoreCase)
        }
        else {
            u.forEach(obj, function(key, value) {
                if (u.equal(key, propertyName, ignoreCase)) {
                    propertyValue = value
                    return false
                }
            })
        }
        return propertyValue
    }

    /**
     * @description 序列化对象
     * @param {Object} paramObj 源对象
     * @return {String}
     */
    u.object.serialize = function(paramObj) {
        var name, value, fullSubName, subName, subValue, innerObj
        var ret = ''
        for (name in paramObj) {
            value = paramObj[name]
            if (value instanceof Array) {
                for (var i = 0; i < value.length; ++i) {
                    subValue = value[i]
                    fullSubName = name + '[' + i + ']'
                    innerObj = {}
                    innerObj[fullSubName] = subValue
                    ret += u.object.serialize(innerObj) + '&'
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName]
                    fullSubName = name + '[' + subName + ']'
                    innerObj = {}
                    innerObj[fullSubName] = subValue
                    ret += u.object.serialize(innerObj) + '&'
                }
            }
            else if (value !== undefined && value !== null) { ret += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&' }
        }
        ret = ret.substring(0, ret.length - 1)
        return ret
    }

    /**
     * @description 删除对象中指定的属性 或 值为空的属性（undefined, null, '')
     * @param {Object} obj 源对象
     * @param {String Array} keys 属性名集合，不传则删除为空的属性
     * @return {Object}
     */
    u.object.remove = function(obj, keys) {
        if (u.isEmpty(obj)) return obj

        var ret = {}
        var es6 = true
        if (!u.isEmpty(keys)) {
            if (!u.isArray(keys)) keys = [keys]
            u.forEach(keys, function(i, key) {
                try {
                    delete obj[key]
                }
                catch (e) {
                    es6 = false
                    return false
                }
            })
            if (es6) return obj
            else {
                u.forEach(obj, function(key, value) {
                    if (keys.indexOf(key) === -1) {
                        ret[key] = value
                    }
                })
                return ret
            }
        }
        else {
            u.forEach(obj, function(key, value) {
                var wrongful = (value === null || value === undefined || value === '')
                try {
                    if (wrongful) delete obj[key]
                }
                catch (e) {
                    es6 = false
                    if (!wrongful) {
                        ret[key] = value
                    }
                }
            })
            if (es6) return obj
            else return ret
        }
    }

    /**
     * @description 清空对象
     * @param {Object} obj 源对象
     * @param {Array} keys 属性名集合，不传则清空全部属性
     * @return {Object} 清空后的对象
     */
    u.object.clear = function(obj, keys) {
        if (u.isEmpty(obj)) return {}

        if (keys) {
            if (!u.isArray(keys)) keys = [keys]
            u.forEach(keys, function(i, key) {
                obj[key] = ''
            })
        }
        else {
            u.forEach(obj, function(key, value) {
                obj[key] = ''
            })
        }
        return obj
    }

    /** ****************************************** JSON **************************************************/

    u.json = {}

    /**
     * @description json格式转树状结构
     * @param {JSON} data json数组 [{},{}]
     * @param {String} id id 的字段名
     * @param {String} pid 父id 的字段名
     * @param {String} child child 的字段名
     * @return {Array}
     */
    u.json.toTreeData = function(data, id, pid, child) {
        var i
        var ret = []
        var hash = {}
        var len = (data || []).length
        for (i = 0; i < len; i++) {
            hash[data[i][id]] = data[i]
        }
        for (i = 0; i < len; i++) {
            var pidO = hash[data[i][pid]]
            if (pidO) {
                pidO[child] = pidO[child] || []
                pidO[child].push(data[i])
            }
            else {
                ret.push(data[i])
            }
        }
        return ret
    }

    /** ****************************************** date 时间 **************************************************/

    u.date = {}

    /**
     * @description 获取需要的时间格式
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'。如果是'星期WW'，则返回（如：'星期日'）
     * @return {String} 格式化后的时间
     */
    u.date.format = function(time, format) {
        time = time ? new Date(time) : new Date()
        format = format || 'YYYY-MM-DD'
        function tf(i) { return (i < 10 ? '0' : '') + i }
        return format.replace(/YYYY|MM|DD|hh|mm|ss|WW/g, function(a) {
            switch (a) {
                    case 'YYYY':
                        return tf(time.getFullYear())
                    case 'MM':
                        return tf(time.getMonth() + 1)
                    case 'DD':
                        return tf(time.getDate())
                    case 'mm':
                        return tf(time.getMinutes())
                    case 'hh':
                        return tf(time.getHours())
                    case 'ss':
                        return tf(time.getSeconds())
                    case 'WW':
                        return ['日', '一', '二', '三', '四', '五', '六'][time.getDay()]
            }
        })
    }

    /**
     * @description 获取前后几月的日期
     * @param {Number} MM 前后几月（正数代表后几个月，负数代表前几个月），默认上个月（-1）
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.otherMonth = function(MM, time, format) {
        MM = !isNaN(parseInt(MM)) ? parseInt(MM) : -1
        time = time ? new Date(time) : new Date()

        var oldDate = time.getDate()
        time.setMonth(time.getMonth() + MM)
        var newDate = time.getDate()
        if (newDate < oldDate) {
            time.setMonth(time.getMonth(), 0)
        }
        return u.date.format(time, format)
    }

    /**
     * @description 某一月的第一天
     * @param {Number} MM 前后几月（正数代表后几个月，负数代表前几个月），默认本月（0）
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.startOfMonth = function(MM, time, format) {
        MM = !isNaN(parseInt(MM)) ? parseInt(MM) : 0
        time = time ? new Date(time) : new Date()

        time.setMonth(time.getMonth() + MM, 1)
        return u.date.format(time, format)
    }

    /**
     * @description 某一月的最后一天
     * @param {Number} MM 前后几月（正数代表后几个月，负数代表前几个月），默认本月（0）
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.endOfMonth = function(MM, time, format) {
        MM = !isNaN(parseInt(MM)) ? parseInt(MM) : 0
        time = time ? new Date(time) : new Date()

        time.setMonth(time.getMonth() + MM + 1, 0)
        return u.date.format(time, format)
    }

    /**
     * @description 某一周的第一天（默认星期一）
     * @param {Number} WW 前后几周（正数代表后几周，负数代表前几周），默认本周（0）
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String}
     */
    u.date.startOfWeek = function(WW, time, format) {
        WW = !isNaN(parseInt(WW)) ? parseInt(WW) : 0
        time = time ? new Date(time) : new Date()

        var curWW = time.getDay()
        curWW = curWW === 0 ? 7 : curWW
        time.setDate(time.getDate() + 7 * WW - (curWW - 1))
        return u.date.format(time, format)
    }

    /**
     * @description 某一周的最后一天（默认星期日）
     * @param {Number} WW 前后几周（正数代表后几周，负数代表前几周），默认本周（0）
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String}
     */
    u.date.endOfWeek = function(WW, time, format) {
        WW = !isNaN(parseInt(WW)) ? parseInt(WW) : 0
        time = time ? new Date(time) : new Date()

        var curWW = time.getDay()
        curWW = curWW === 0 ? 7 : curWW
        time.setDate(time.getDate() + 7 * WW - (curWW - 1) + 6)
        return u.date.format(time, format)
    }

    /**
     * @description 前后几天的日期（几小时、几分钟均可）
     * @param {Number} DD 前后几天（正数代表后几天，负数代表前几天），默认过去一周的日期（-6）
     * @param {Date} time 时间、时间字符串、时间戳
     * @param {String} format 时间格式，默认'YYYY-MM-DD'
     * @return {String} 格式化后的时间
     */
    u.date.otherDate = function(DD, time, format) {
        DD = !isNaN(parseFloat(DD)) ? parseFloat(DD) : -6
        time = time ? new Date(time) : new Date()

        time.setTime(time.getTime() + DD * (24 * 3600 * 1000))
        return u.date.format(time, format)
    }

    /**
     * @description 两个日期之间相差多少天
     * @param {Date} date1
     * @param {Date} date2
     * @return {Number}
     */
    u.date.howManyDays = function(date1, date2) {
        var ret = ''
        var timestamp1 = Date.parse(date1)
        var timestamp2 = Date.parse(date2)
        var dateSpan = Math.abs(timestamp2 - timestamp1)
        ret = Math.floor(dateSpan / (24 * 3600 * 1000))
        return ret
    }

    /**
     * @description 两个日期之间相差多少月
     * @param {Date} date1
     * @param {Date} date2
     * @return {Number}
     */
    u.date.howManyMonths = function(date1, date2) {
        var months1, months2, ret
        date1 = new Date(date1)
        date2 = new Date(date2)
        months1 = date1.getFullYear() * 12 + date1.getMonth() + 1
        months2 = date2.getFullYear() * 12 + date2.getMonth() + 1
        ret = Math.abs(months1 - months2)
        return ret
    }

    /**
     * @description 查询两个日期之间的所有日期
     * @param {Date} date1
     * @param {Date} date2
     * @return {Array}
     */
    u.date.getDatesBetween = function(date1, date2, format) {
        format = format || 'YYYY-MM-DD'

        var start, len
        var ret = []
        start = Date.parse(date1) < Date.parse(date2) ? date1 : date2
        // 所有天
        if (format.indexOf('DD') > -1) {
            len = u.date.howManyDays(date1, date2)
            for (var i = 0; i <= len; i++) {
                ret.push(u.date.otherDate(i, start, format))
            }
        }
        // 所有月
        else {
            len = u.date.howManyMonths(date1, date2)
            for (var j = 0; j <= len; j++) {
                ret.push(u.date.otherMonth(j, start, format))
            }
        }
        return ret
    }

    /** ******************************************* browser 浏览器/手机端 ***************************************************/

    u.browser = {}

    var userAgent = window.navigator.userAgent // 获取浏览器的userAgent字符串

    /**
     * @description 判断当前浏览类型
     * @return {String} ie7
     * @return {String} ie8
     * @return {String} ie9
     * @return {String} ie10
     * @return {String} ie11
     * @return {String} edge
     * @return {String} chrome
     * @return {String} safari
     * @return {String} firefox
     * @return {String} opera
     */
    u.browser.type = function() {
        if (u.browser.isIE()) {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
            reIE.test(userAgent)
            var fIEVersion = parseFloat(RegExp['$1'])
            if (fIEVersion === 7) return 'ie7'
            if (fIEVersion === 8) return 'ie8'
            if (fIEVersion === 9) return 'ie9'
            if (fIEVersion === 10) return 'ie10'
            if (fIEVersion === 11) return 'ie11'
            else return false // IE版本过低
        }

        if (u.browser.isFirefox()) return 'firefox'
        if (u.browser.isOpera()) return 'opera'
        if (u.browser.isSafari()) return 'safari'
        if (u.browser.isChrome()) return 'chrome'
        if (u.browser.isEdge()) return 'edge'
    }
    /**
     * @description 判断是否是IE浏览器
     */
    u.browser.isIE = function() {
        return userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !u.browser.isOpera()
    }
    /**
     * @description 判断是否IE的Edge浏览器
     */
    u.browser.isEdge = function() {
        return userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !u.browser.isIE()
    }
    /**
     * @description 判断是否Safari浏览器
     */
    u.browser.isSafari = function() {
        return userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1
    }
    /**
     * @description 判断是否是Chrome浏览器
     */
    u.browser.isChrome = function() {
        return userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1
    }
    /**
     * @description 判断是否Firefox浏览器
     */
    u.browser.isFirefox = function() {
        return userAgent.indexOf('Firefox') > -1
    }
    /**
     * @description 判断是否Opera浏览器
     */
    u.browser.isOpera = function() {
        return userAgent.indexOf('Opera') > -1
    }
    /**
     * @description 判断是否是微信浏览器
     */
    u.browser.isWechat = function() {
        var ua = userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) === 'micromessenger') return true
        else return false
    }
    /**
     * @description 判断是否是android
     */
    u.browser.isAndroid = function() {
        return (/android/gi).test(navigator.appVersion)
    }
    /**
     * @description 判断是否是ios
     */
    u.browser.isIOS = function() {
        if (userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) return true
        else return false
    }
    /**
     * @description 判断是否是移动端
     */
    u.browser.isMobile = function() {
        if (userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            return true
        }
        else return false
    }
    /**
     * @description 根据手机设备调取相机
     * <input type="file" capture="camera" accept="image/*" multiple="multiple">
     * Android：加上 capture 属性，可以同时调用相册和相机，否则只能调用相册；
     * IOS：    加上 capture 属性，只能调相机，反之可以同时调用相册和相机。二者在 capture="camera" 上是相反的
     */
    u.browser.callCamera = function() {
        if (u.browser.isIOS()) {
            var file = window.document.querySelectorAll('input[capture=camera]')
            for (var i = 0; i < file.length; i++) {
                file[i].removeAttribute('capture')
            }
        }
    }

    /** ****************************************** base64 **************************************************/

    u.base64 = {}

    // base64 前缀
    u.base64.prefix = 'data:image/png;base64,'

    /**
     * @description base64 编码
     * @param {input}
     */
    u.base64.encrypt = function(input) {
        var str = CryptoJS.enc.Utf8.parse(input)
        var base64 = CryptoJS.enc.Base64.stringify(str)
        return base64
    }

    /**
     * @description base64 解码
     * @param {input}
     */
    u.base64.decrypt = function(input) {
        return CryptoJS.enc.Base64.parse(input).toString(CryptoJS.enc.Utf8)
    }

    /** ******************************************* url 路径处理 ***************************************************/

    u.url = {}

    /**
     * @description 获取url参数
     * @param {String} name 参数名，不传则返回所有参数的对象
     * @return {String Object}
     */
    u.url.getParams = function(name) {
        var search = window.location.search.substring(1)
        if (!search) {
            search = window.location.hash.split('?')[1]
        }
        if (search) {
            var obj = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
            return name ? obj[name] : obj
        }
    }

    /**
     * @description 页面跳转（参数传递）
     * @param {String} url 目标地址
     * @return {Object} param 参数对象
     */
    u.url.jump = function(url, param) {
        if (param) {
            url = url + '?' + u.object.serialize(param)
        }
        window.location.href = url
    }

    /**
     * @description 页面跳转（需跳回）
     * @param {String} url 目标地址
     * @param {String} referrerURL 源地址，默认当前页面的地址
     */
    u.url.jumpFromReferrer = function(url, referrerURL) {
        referrerURL = referrerURL || window.location.href
        window.location.href = url + '?' + encodeURIComponent('referrer=' + referrerURL)
    }

    /**
     * @description 跳回到之前的页面
     */
    u.url.jumpToReferrer = function() {
        var search = decodeURIComponent(window.location.search)
        var url = search.split('referrer=')[1]
        window.location.href = url
    }

    /** ******************************************* validate 验证 ***************************************************/

    u.validate = {}

    /**
     * @description 验证是否必填
     * @param {String} input
     */
    u.validate.required = function(input) {
        return !u.isEmpty(input)
    }
    // 验证手机号码
    u.validate.mobile = function(input) {
        return /^1[34578][0-9]{9}$/.test(input)
    }
    // 验证座机号码
    u.validate.fixedPhone = function(input) {
        return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(input)
    }
    // 验证手机或者座机号码
    u.validate.phone = function(input) {
        return u.validate.mobile(input) || u.validate.fixedPhone(input)
    }
    // 验证邮箱号码
    u.validate.email = function(input) {
        // ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(input)
    }
    // 验证身份证号码
    u.validate.IDcard = function(input) {
        return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(input)
    }
    // 验证 url
    u.validate.url = function(input) {
        return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(input)
    }
    // 验证数字
    u.validate.number = function(input) {
        return /^(\+|-)?((0)|([1-9][0-9]*))$|^(\+|-)?((0)|([1-9][0-9]*)).[0-9]+$/.test(input)
    }
    // 验证整数（不包括0）
    u.validate.integer = function(input) {
        return /^(\+|-)?[1-9][0-9]*$/.test(input)
    }
    // 验证正整数（不包括0）
    u.validate.positiveInteger = function(input) {
        return /^\+?[1-9][0-9]*$/.test(input)
    }
    // 验证正数（不包括0）
    u.validate.positive = function(input) {
        return /^[1-9][0-9]*$|^((0)|([1-9][0-9]*)).[0-9]+$/.test(input)
    }
    // 验证精确到几位小数的正数（不包括0）
    u.validate.positiveToFixed = function(input, digits) {
        digits = digits || 2
        var reg = new RegExp('^[1-9][0-9]*$|^((0)|([1-9][0-9]*)).[0-9]{' + digits + '}$')
        return reg.test(input)
    }
    // 验证是否相等
    u.validate.equal = function(input1, input2) {
        return u.equal(input1, input2)
    }

    /** ******************************************* event 事件工具集 ***************************************************/

    u.event = {} // event(事件)工具集，来源：github.com/markyun

    /**
     * @description 页面加载完成后
     * @param {Function} fn
     */
    u.event.ready = function(fn) {
        if (fn == null) {
            fn = document
        }
        var oldonload = window.onload
        if (typeof window.onload !== 'function') {
            window.onload = fn
        }
        else {
            window.onload = function() {
                oldonload()
                fn()
            }
        }
    }

    /**
     * @description 添加事件
     * @param {Object} element 必需。描述事件名称的字符串。注意：不要使用 "on" 前缀。例如，使用 "click" 来取代 "onclick"。
     * @param {String} type 必需。描述事件名称的字符串。注意：不要使用 "on" 前缀。例如，使用 "click" 来取代 "onclick"。
     * @param {Function} handler 必需。描述了事件触发后执行的函数。
     * @param {Boolean} useCapture 可选。true: 事件在捕获阶段执行; false(默认): 事件在冒泡阶段执行
     */
    u.event.add = function(element, type, handler, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, useCapture)
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, function() {
                handler.call(element)
            })
        }
        else {
            element['on' + type] = handler
        }
    }

    /**
     * @description 移除事件
     * @param {Object} element 必需。描述事件名称的字符串。注意：不要使用 "on" 前缀。例如，使用 "click" 来取代 "onclick"。
     * @param {String} type 必需。描述事件名称的字符串。注意：不要使用 "on" 前缀。例如，使用 "click" 来取代 "onclick"。
     * @param {Function} handler 必需。描述了事件触发后执行的函数。
     * @param {Boolean} useCapture 可选。true: 事件在捕获阶段执行; false(默认): 事件在冒泡阶段执行
     */
    u.event.remove = function(element, type, handler, useCapture) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, useCapture)
        }
        else if (element.datachEvent) {
            element.detachEvent('on' + type, handler)
        }
        else {
            element['on' + type] = null
        }
    }

    /**
     * @description 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
     * @param {Object} ev 事件对象
     */
    u.event.stop = function(ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation()
        }
        else {
            ev.cancelBubble = true
        }
    }

    /**
     * @description 取消事件的默认行为
     * @param {Object} ev 事件对象
     */
    u.event.prevent = function(ev) {
        if (ev.preventDefault) {
            ev.preventDefault()
        }
        else {
            ev.returnValue = false
        }
    }

    /**
     * @description 获取事件目标
     * @param {Object} ev 事件对象
     */
    u.event.target = function(ev) {
        return ev.target || ev.srcElement
    }

    /**
     * @description 获取event对象的引用，取到事件的所有信息，确保随时能使用event
     * @param {Object} ev 事件对象
     */
    u.event.get = function(ev) {
        ev = ev || window.event
        if (!ev) {
            var c = u.event.get.caller
            while (c) {
                ev = c.arguments[0]
                if (ev && Event === ev.constructor) {
                    break
                }
                c = c.caller
            }
        }
        return ev
    }

    /** ******************************************* layout 布局 ***************************************************/

    u.layout = {}

    /**
     * @description 固定页脚。页面内容的高度小于浏览器高度时，将页脚定位在底部；否则，不定位。（适用于任何一个div盒子里的页脚固定）
     * @param {Dom Object} oBody  被定位元素的父级元素 的dom对象
     * @param {Dom Object} oFooter  被定位元素的dom对象
     */
    u.layout.fixedFooter = function(oBody, oFooter) {
        var sh, fh
        var h = 0
        sh = document.documentElement.clientHeight // 页面对象高度（即BODY对象高度加上Margin高）
        fh = oFooter.offsetHeight
        if (u.browser.isWechat()) h = 64 // 微信浏览器要去除状态栏的高度
        // 处理父元素
        oBody.style.position = 'relative'
        oBody.style.minHeight = (sh - h) + 'px'
        oBody.style.paddingBottom = fh + 'px'
        oBody.style.boxSizing = 'border-box'
        // 处理页脚元素
        oFooter.style.position = 'absolute'
        oFooter.style.bottom = '0' + 'px'
    }

    window._util = u
})(window)

// module.exports = u