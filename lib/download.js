const {promisify} = require('util')

/**
 * 拉取仓库代码到本地
 * repo: 仓库地址
 * desc：创建项目名
 */
module.exports.clone = async (repo, desc) => {
  // promise化
  const download = promisify(require('download-git-repo'))
  // loading包
  const ora = require('ora')
  const process = ora(`下载....${repo}`)
  // loading开始
  process.start()
  // 开始下载
  await download(repo, desc)
  // loading结束
  process.succeed()
}

/**
 * 开启子进程执行命令
 */
module.exports.spawn = async (...args) => {
  // 开启子进程包
  const {spawn} = require('child_process')
  // 兼容window处理
  args[0] = /^win/.test(process.platform) ? `${args[0]}.cmd` : args[0]

  return new Promise(resolve => {
    // 开始一个子进程，执行命令
    const proc = spawn(...args)
    // 将子进程输出对接到主进程
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    // 子进程完成后
    proc.on('close', () => {
      resolve()
    })
  })
}