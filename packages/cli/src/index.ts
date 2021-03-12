import { Command, flags } from '@oclif/command'
import { sync as globSync } from 'glob'

class FachiCli extends Command {
  // allows to pass in multiple file paths
  static strict = false

  static description = 'Run benchmark file(s)'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' })
  }

  async run() {
    const { flags, argv } = this.parse(FachiCli)
    const filePaths = argv.reduce((results: string[], globPattern: string): string[] => {
      return [...results, ...globSync(globPattern)]
    }, [])

    filePaths.forEach((path) => {
      require(path);
    })
  }
}

export = FachiCli
