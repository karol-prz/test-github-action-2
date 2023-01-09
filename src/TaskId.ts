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

        client.rest.pulls.get({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: prNumber,
        }).then(pullRequest => {
            const branchName = pullRequest.data.head.ref

            const taskIdRegex = new RegExp("\/([0-9]+)\/")
            const taskIdMatch = taskIdRegex.exec(branchName)
            if (taskIdMatch == null) {
                core.debug(`Unable to find taskId in branch name ${branchName}`)
                return undefined
            } else {
                const taskId = taskIdMatch[1]
                core.debug(`Found task id ${taskId}`)
                return taskId
            }
        })
        
    })
}

function getPrNumber(): number | undefined {
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        return undefined;
    }
    
    return pullRequest.number;
}