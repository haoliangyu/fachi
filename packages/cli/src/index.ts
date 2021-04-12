import { resolve } from 'path'
import { existsSync } from 'fs'
import { Command, flags } from '@oclif/command'
import { sync as globSync } from 'globby'
import isGlob from 'is-glob'
import { suite } from './global'

class Fachi extends Command {
  // allows to pass in multiple file paths
  static strict = false

  static description = 'Run benchmark file(s)'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' })
  }

  async run () {
    const { argv } = this.parse(Fachi)
    const cwd = process.cwd()
    const filePaths = argv.reduce((results: string[], pattern: string): string[] => {
      const newPaths = []

      if (isGlob(pattern)) {
        newPaths.push(...globSync(pattern, { cwd }))
      } else if (existsSync(resolve(cwd, pattern))) {
        newPaths.push(resolve(cwd, pattern))
      } else {
        console.log('nothing found', pattern)
      }

      return [...results, ...newPaths]
    }, [])

    Object.assign(global, { suite })

    filePaths.forEach((path) => {
      require(path)
    })
  }
}

export = Fachi
