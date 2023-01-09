import * as github from "@actions/github"
import * as core from '@actions/core'

export type ClientType = ReturnType<typeof github.getOctokit>;

export async function getTaskId(): Promise<string | undefined> {
    // const prNumber = getPrNumber()
    // if (!prNumber) {
    //     core.debug(`Unable to find current PR number`)
    //     return undefined
    // }

    // const pullRequest = await client.rest.pulls.get({
    //     owner: github.context.repo.owner,
    //     repo: github.context.repo.repo,
    //     pull_number: prNumber,
    // })

    // let branchName = pullRequest.data.head.ref

    const branchName = process.env.GITHUB_HEAD_REF?.replace('refs/heads/', '');
    core.debug(`Branch name is ${branchName}`)
    if (!branchName) {
        throw Error("Branch name is undefined")
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

function getPrNumber(): number | undefined {
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        return undefined;
    }
    
    return pullRequest.number;
}