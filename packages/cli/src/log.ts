import cli from 'cli-ux'

type IFileOptions = {
  current: number
  total: number
}

export function logFileRun (path: string, options: IFileOptions): void {
  console.log(`- ${path} (${options.current}/${options.total})`)
}

export function logSuitRun (name: string): void {
  console.log(padString(name, 1))
}

export function logTestRun (name: string): void {
  cli.action.start(padString(name, 2))
}

export function logTestEnd (message: string, failed?: boolean): void {
  if (failed) {
    cli.action.stop('FAILED')
  } else {
    cli.action.stop(message)
  }
}

export function logError(error: Error): void {
  console.error(error)
}

function padString (message: string, level: number = 0) {
  return message.padStart(message.length + level * 2)
}