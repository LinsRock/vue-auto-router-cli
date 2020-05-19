#!/usr/bin/env node
const program = require('commander') // node中专门用来定制命令行界面的库

/* 定制命令行界面 */
// 版本查看指令
program.version(require('../package.json').version)

// init <name>指令
program
  .command('init <name>')
  .description('init project')
  .action(require('../lib/init'))

  
// refresh 指令
program
  .command('refresh')
  .description('refresh router & menu')
  .action(require('../lib/refresh'))
  
program.parse(process.argv)
