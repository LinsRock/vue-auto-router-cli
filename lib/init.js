const {promisify} = require('util') // 将异步函数转换为Promise形式
const figlet = promisify(require('figlet')) // 将字符串转换为颜文字
const clear = require('clear') // 清空控制台输出
const chalk = require('chalk') // 将命令行改变颜色
const open = require('open') // 自动打开浏览器

const {clone, spawn} = require('./download')

// 定义一个输出绿色文字的log方法
const log = text => console.log(chalk.green(text))

module.exports = async name => {
  // 1.清屏
  clear()

  // 2.将文本转换为颜文字
  const text = await figlet('Heresy Welcome')

  // 3.输出欢迎文本
  log(text)

  // 4.拉取仓库模板代码到指定位置
  log(`🎁创建项目：${name}`)
  await clone(`github:su37josephxia/vue-template`, name)

  // 5.安装依赖（在项目目录下开启子进程执行npm install)
  log('⚡安装依赖')
  await spawn('cnpm', ['install'], {cwd: `./${name}`})
  log(`
⭐安装完成：
To get Start: 
===========================
     cd ${name}
    npm run serve 
===========================
  `)

  // 6.启动项目
  log('🚀启动项目')
  open('http://localhost:8080')
  await spawn('npm', ['run', 'serve'], {cwd: `./${name}`})

}