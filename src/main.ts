import * as core from '@actions/core'
import {getBuildVersionNumber} from './getBuildVersionNumber'
import {getTaskId} from './getTaskId'
import {sendWebHook} from './sendWebHook'

async function run(): Promise<void> {
  try {
    const buildVersionFile: string = core.getInput('buildVersionFile')
    const buildVersionRegex: string = core.getInput('buildVersionRegex')

    const buildVersionNumber: string = await getBuildVersionNumber(
      buildVersionFile,
      buildVersionRegex
    )
    const taskId = await getTaskId()

    if (taskId) {
      core.debug(
        `Sending webhook with buildVersionNumber: ${buildVersionNumber}, and taskId: ${taskId}`
      )
      sendWebHook(buildVersionNumber, taskId)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
