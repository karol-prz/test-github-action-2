import * as core from '@actions/core'
import { readFileSync } from 'fs'

async function run(): Promise<void> {
  try {
    const buildVersionFile: string = core.getInput('buildVersionFile')
    core.debug('Hello World')
    core.debug(`Waiting getting file ${buildVersionFile}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const file = readFileSync(`./${buildVersionFile}`, 'utf-8')

    core.debug(`Contents of file are: ${file}`)

    const regex = new RegExp(core.getInput('buildVersionRegex'))
    core.debug(`Testing regex ${regex.test(file)}`)

    const buildVersion = regex.exec(file)
    if (buildVersion == null) {
      core.debug("Build version was null ")
    } else {
      core.debug(`Result is ${buildVersion[1]}`)
    }
  

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
