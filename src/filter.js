/**
 * @description: 自定义过滤器
 * @author: guang.shi <https://blog.csdn.net/guang_s>
 * @date: 2019-03-26 11:57:38
 */

// 枚举对象的查询
template.defaults.imports.enumeration = function(source, option) {
    return _sv.enumeration[option][source]
}
// 格式化日期
template.defaults.imports.dateFormat = function(source, format) {
    return _util.date.format(source, format)
}
// 处理模板，对没有转义的内容进行二次渲染
template.defaults.imports.renderTpl = function(source, item, itemStr) {
    itemStr = itemStr || 'item'
    var data = {}
    data[itemStr] = item
    return template.render(source, data)
}
