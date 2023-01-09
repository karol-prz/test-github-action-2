import * as github from "@actions/github"
import * as core from '@actions/core'

export type ClientType = ReturnType<typeof github.getOctokit>;

export async function getTaskId(client: ClientType): Promise<string | undefined> {
    return new Promise(() => {
        const prNumber = getPrNumber()
        if (!prNumber) {
            core.debug(`Unable to find current PR number`)
            return undefined
        }

        const taskId = client.rest.pulls.get({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: prNumber,
        }).then(pullRequest => {
            let branchName = pullRequest.data.head.ref

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
        })
        
        core.debug(`Returning taskId ${taskId}`)
        return taskId
    })
}

function getPrNumber(): number | undefined {
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        return undefined;
    }
    
    return pullRequest.number;
}