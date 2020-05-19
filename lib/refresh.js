const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

/**
 * 根据模板重新生成文件
 * @param {*} meta 传递参数
 * @param {*} filePath 文件路径
 * @param {*} templatePath 文件模板路径
 */
function compile (meta, filePath, templatePath) {
  // 模板文件是否存在
  if (fs.existsSync(templatePath)) {
    // 读取模板内容
    const content = fs.readFileSync(templatePath).toString()
    // 根据meta重新编译文件内容，得到新文件内容
    const result = handlebars.compile(content)(meta)
    // 重新写入
    fs.writeFileSync(filePath, result)

    // 输出日志
    console.log(chalk.green(`- ${filePath} 创建成功`))
  }
}

// 自动生成视图路由和菜单
module.exports = async () => {
  // 获取view目录下的视图文件列表
  const list = 
    fs.readdirSync('./src/views') // 相对的是执行heresy refresh命令的地址
      .filter(f => f !== 'Home.vue') // 过滤Home.vue
      .map(f => ({
        name: f.replace('.vue', '').toLowerCase(),
        file: f
      }))

  // 生成路由文件
  compile({list}, './src/router.js', './template/router.js.hbs')
  // 生成菜单文件
  compile({list}, './src/App.vue', './template/App.vue.hbs')
}