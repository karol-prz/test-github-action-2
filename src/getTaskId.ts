import * as core from '@actions/core'

export async function getTaskId(): Promise<string | undefined> {
  const branchName = process.env.GITHUB_HEAD_REF?.replace('refs/heads/', '')
  if (!branchName) {
    throw Error(
      'Branch name is not found, is this being run in a pull request?'
    )
  }

  const taskIdRegex = new RegExp('/([0-9]+)/')
  const taskIdMatch = taskIdRegex.exec(branchName)
  if (taskIdMatch == null) {
    core.debug(`Unable to find taskId in branch name ${branchName}`)
    return undefined
  } else {
    const taskId = taskIdMatch[1]
    core.debug(`Found task id ${taskId}`)
    return taskId
  }
}
