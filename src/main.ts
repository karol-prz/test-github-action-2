import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const buildVersionFile: string = core.getInput('buildVersionFile')
    core.debug('Hello World')
    core.debug(`Waiting getting file ${buildVersionFile}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
