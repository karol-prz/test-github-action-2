import * as core from '@actions/core'

export async function getTaskId(): Promise<string | undefined> {
    const branchName = process.env.GITHUB_HEAD_REF?.replace('refs/heads/', '');
    if (!branchName) {
        throw Error("Branch name is not found, is this being run in a pull request?")
    }

    let taskIdRegex = new RegExp("\/([0-9]+)\/")
    let taskIdMatch = taskIdRegex.exec(branchName)
    if (taskIdMatch == null) {
        core.debug(`Unable to find taskId in branch name ${branchName}`)
        return undefined
    } else {
        let taskId = taskIdMatch[1]
        core.debug(`Found task id ${taskId}`)
        return taskId
    }
}
