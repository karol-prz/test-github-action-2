import * as core from '@actions/core'
import * as github from "@actions/github"
import { getBuildVersionNumber } from './VersionNumber'
import { ClientType, getTaskId } from './TaskId'
import { sendWebHook } from './SendWebHook'

async function run(): Promise<void> {
  try {
    const buildVersionFile: string = core.getInput('buildVersionFile')
    const buildVersionRegex: string = core.getInput('buildVersionRegex')
    const token = core.getInput("repo-token", { required: true })

    const client: ClientType = github.getOctokit(token)

    const buildVersionNumber: string = await getBuildVersionNumber(buildVersionFile, buildVersionRegex)
    const taskId = await getTaskId(client)

    if (taskId) {
      core.debug(`Sending webhook with buildVersionNumber: ${buildVersionNumber}, and taskId: ${taskId}`)
      sendWebHook(buildVersionNumber, taskId)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
