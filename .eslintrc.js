/**
 * @description: eslint代码检查规则
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2019-04-30 15:32:46 
 */

module.exports = {
  root: true,               // 停止在父级目录中寻找 .eslintrc.* | package.json 文件里的 eslintConfig
  parserOptions: {          // 解析器选项。帮助 ESLint 确定什么是解析错误，所有语言选项默认都是 false
    parser: 'babel-eslint',
    sourceType: 'module',   // script (默认) | module（如果你的代码是 ECMAScript 模块)
    ecmaFeatures: {         // 想使用的额外的语言特性
      'jsx': true           // 启用 JSX
    }
  },
  env: {
    browser: true,          // 浏览器全局变量
    node: true,
    es6: true,              // 启用 ES6 语法支持
    jquery: true            // jQuery 全局变量
  },
  globals: {                // 定义全局变量。访问当前源文件内未定义的变量时，no-undef 规则将发出警告。如果你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了
    '_util': false,         // false 不允许被重写
  },
  extends: ['eslint:recommended'],  // 一个配置文件可以从基础配置中继承已启用的规则，每个配置继承它前面的配置

  // 在此处添加自定义规则，此规则基于 https://cn.eslint.org/docs/rules/
  // 启用的规则及其各自的错误级别：
  // 'off' | 0    - 关闭规则
  // 'warn' | 1   - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // 'error' | 2  - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    'accessor-pairs': 2,                          // 强制 getter 和 setter 在对象中成对出现
    'arrow-spacing': [2, {                        // 强制箭头函数的箭头前后使用一致的空格
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],               // 禁止或强制在左花括号和同一行上的下一个 token 之间有一致的空格
    'brace-style': [2, 'stroustrup', {            // 强制在代码块中使用一致的大括号风格 1tbs|stroustrup（if-else中的else语句，连同catch 和 finally，都必须在右括号后另起一行）|allman
      'allowSingleLine': true                     // 允许块的开括号和闭括号在 同一行
    }],
    'camelcase': [0, {                            // 强制使用骆驼拼写法命名约定
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],                 // 要求或禁止末尾逗号 never|always|always-multiline
    'comma-spacing': [2, {                        // 强制在逗号前后使用一致的空格
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],                   // 强制使用一致的逗号风格
    'constructor-super': 2,                       // 要求在构造函数中有 super() 的调用
    'curly': [2, 'multi-line'],                   // 强制所有控制语句使用一致的括号风格
    'dot-location': [2, 'property'],              // 强制在点号之前和之后一致的换行
    'eol-last': 2,
    'eqeqeq': [2, 'always', {'null': 'ignore'}],  // 要求使用 === 和 !==
    'generator-star-spacing': [2, {               // 强制 generator 函数中 * 号周围使用一致的空格
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],  // 要求回调函数中有容错处理
    'indent': [2, 4, {                            // 强制使用一致的缩进
      'SwitchCase': 2
    }],
    'jsx-quotes': [2, 'prefer-single'],           // 强制在 JSX 属性中一致地使用双引号或单引号
    'key-spacing': [2, {                          // 强制在对象字面量的属性中键和值之间使用一致的间距
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {                      // 强制在关键字前后使用一致的空格
      'before': true,
      'after': true
    }],
    'new-cap': [2, {                              // 要求构造函数首字母大写
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,                              // 要求调用无参构造函数时有圆括号
    'no-array-constructor': 2,                    // 禁用 Array 构造函数
    'no-caller': 2,                               // 禁用 arguments.caller 或 arguments.callee
    'no-console': 1,                              // 禁用 console
    'no-class-assign': 2,                         // 禁止修改 类声明的变量
    'no-cond-assign': 2,                          // 禁止条件表达式中出现赋值操作符
    'no-const-assign': 2,                         // 禁止修改 const 声明的变量
    'no-control-regex': 0,                        // 禁止在正则表达式中使用控制字符
    'no-delete-var': 2,                           // 禁止删除变量
    'no-dupe-args': 2,                            // 禁止 function 定义中出现重名参数
    'no-dupe-class-members': 2,                   // 禁止 类成员中出现重复的名称
    'no-dupe-keys': 2,                            // 禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2,                       // 禁止出现重复的 case 标签
    'no-empty-character-class': 2,                // 禁止在正则表达式中使用空字符集
    'no-empty-pattern': 2,                        // 禁止使用空解构模式
    'no-eval': 2,                                 // 禁用 eval()
    'no-ex-assign': 2,                            // 禁止对 catch 子句的参数重新赋值
    'no-extend-native': 2,                        // 禁止扩展原生类型
    'no-extra-bind': 2,                           // 禁止不必要的 .bind() 调用
    'no-extra-boolean-cast': 2,                   // 禁止不必要的布尔转换 !!
    'no-extra-parens': [2, 'functions'],          // 禁止不必要的括号
    'no-fallthrough': 2,                          // 禁止 case 语句落空
    'no-floating-decimal': 2,                     // 禁止数字字面量中使用前导和末尾小数点
    'no-func-assign': 2,                          // 禁止对 function 声明重新赋值
    'no-implied-eval': 2,                         // 禁止使用类似 eval() 的方法
    'no-inner-declarations': [2, 'functions'],    // 禁止在嵌套的块中出现变量声明或 function 声明
    'no-invalid-regexp': 2,                       // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-irregular-whitespace': 2,                 // 禁止在字符串和注释之外不规则的空白
    'no-iterator': 2,                             // 禁用 __iterator__ 属性
    'no-label-var': 2,                            // 不允许标签与变量同名
    'no-labels': [2, {                            // 禁用标签语句
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,                          // 禁用不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2,                // 禁止空格和 tab 的混合缩进
    'no-multi-spaces': 2,                         // 禁止使用多个空格
    'no-multi-str': 2,                            // 禁止使用多行字符串
    'no-multiple-empty-lines': [2, {              // 禁止出现多行空行
      'max': 1
    }],
    'no-global-assign': 2,                        // 禁止对原生对象或只读的全局对象进行赋值
    'no-unsafe-negation': 2,                      // 禁止对关系运算符的左操作数使用否定操作符 !(key in object)
    'no-new-object': 2,                           // 禁用 Object 的构造函数。如：new Object()
    'no-new-require': 2,                          // 禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2,                           // 禁止 Symbol 操作符和 new 一起使用
    'no-new-wrappers': 2,                         // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2,                            // 禁止把全局对象作为函数调用。如：Math()
    'no-octal': 2,                                // 禁用八进制字面量（以 0 开始的数字）
    'no-octal-escape': 2,                         // 禁止在字符串中使用八进制转义序列。（应该使用 Unicode 转义序列）
    'no-path-concat': 2,                          // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2,                                // 禁用 __proto__ 属性。（应该使用 getPrototypeOf 方法）
    'no-redeclare': 2,                            // 禁止多次声明同一变量
    'no-regex-spaces': 2,                         // 禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'],     // 禁止在 return 语句中使用赋值语句 except-parens|always
    'no-self-assign': 2,                          // 禁止自我赋值
    'no-self-compare': 2,                         // 禁止自身比较
    'no-sequences': 2,                            // 禁用逗号操作符
    'no-shadow-restricted-names': 2,              // 禁止将变量定义为关键字
    'func-call-spacing': [2, 'never'],            // 禁止或要求在函数名和开括号之间有空格 never|always
    'no-sparse-arrays': 2,                        // 禁用稀疏数组
    'no-this-before-super': 2,                    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super      
    'no-throw-literal': 2,                        // 禁止抛出异常字面量
    'no-trailing-spaces': 2,                      // 禁用行尾空格
    'no-undef': 2,                                // 禁用未声明的变量，除非它们在 /* global */ 注释中被提到
    'no-undef-init': 2,                           // 禁止将变量初始化为 undefined
    'no-unexpected-multiline': 2,                 // 禁止出现令人困惑的多行表达式
    'no-unmodified-loop-condition': 2,            // 禁用一成不变的循环条件
    'no-unneeded-ternary': 2,                     // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unreachable': 2,                          // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 2,                       // 禁止在 finally 语句块中出现控制流语句
    'no-unused-vars': [2, {                       // 禁止出现未使用过的变量
      'vars': 'all',                              // 检测所有变量，包括全局环境中的变量
      'args': 'none'                              // 参数可以不使用
    }], 
    'no-useless-call': 2,                         // 禁止不必要的 .call() 和 .apply()
    'no-useless-computed-key': 2,                 // 禁止在对象中使用不必要的计算属性
    'no-useless-constructor': 2,                  // 禁用不必要的构造函数
    'no-useless-escape': 0,                       // 禁用不必要的转义字符
    'no-whitespace-before-property': 2,           // 禁止属性前有空白
    'no-with': 2,                                 // 禁用 with 语句
    'one-var': [0, {                              // 强制函数中的变量在一起声明或分开声明 always|never|consecutive
      "initialized": "never"                      // 要求每个作用域的初始化的变量有多个变量声明
    }],
    'operator-linebreak': [2, 'before'],          // 强制操作符使用一致的换行符风格 after|before|none 和 overrides对象
    'padded-blocks': [2, 'never'],                // 禁止或要求块内填充 never|always
    'quotes': [2, 'single', {                     // 强制使用一致的反勾号、双引号或单引号
      'avoidEscape': true,                        // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
      'allowTemplateLiterals': true               // 允许字符串使用反勾号
    }], 
    'semi': [2, 'never'],                         // 要求或禁止使用分号代替 ASI (always|never)
    'semi-spacing': [2, {                         // 强制分号之前和之后使用一致的空格。 false: 禁止有空格 | true: 强制有空格
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],         // 强制在块之前使用一致的空格
    'space-before-function-paren': [2, 'never'],  // 强制在 function的左括号之前使用一致的空格
    'space-in-parens': [2, 'never'],              // 强制在圆括号内使用一致的空格
    'space-infix-ops': 2,                         // 要求操作符周围有空格
    'space-unary-ops': [2, {                      // 要求或禁止在一元操作符之前或之后存在空格
      'words': true,                              // 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
      'nonwords': false                           // 适用于这些一元操作符: -、+、--、++、!、!!
    }],
    'spaced-comment': [2, 'always', {             // 强制在注释中 // 或 /* 使用一致的空格
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],       // 要求或禁止模板字符串中的嵌入表达式周围空格的使用 `${}`
    'use-isnan': 2,                               // 要求使用 isNaN() 检查 NaN
    'valid-typeof': 2,                            // 强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'],                      // 要求 IIFE（立即执行函数）使用括号括起来
    'yield-star-spacing': [2, 'both'],            // 强制在 yield* 表达式中 * 周围使用空格
    'yoda': [2, 'never'],                         // 要求或禁止 Yoda条件（在条件判断中字面量在先而变量在第二的位置）
    'prefer-const': 2,                            // 要求使用 const 声明那些声明后不再被修改的变量（针对 let 声明）
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {       // 强制在大括号中使用一致的空格
      objectsInObjects: false                     // 禁止以对象元素开始或结尾的对象的花括号中有空格
    }],
    'array-bracket-spacing': [2, 'never']         // 强制数组方括号中使用一致的空格
  }
};
