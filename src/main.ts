import * as core from '@actions/core'
import * as github from "@actions/github";
import { readFileSync } from 'fs'

type ClientType = ReturnType<typeof github.getOctokit>;

async function run(): Promise<void> {
  try {
    // section getting build version number
    const buildVersionFile: string = core.getInput('buildVersionFile')
    const buildVersionRegex: string = core.getInput('buildVersionRegex')

    const file = readFileSync(`./${buildVersionFile}`, 'utf-8')
    const regex = new RegExp(buildVersionRegex)

    const buildVersionMatch = regex.exec(file)
    if (buildVersionMatch == null) {
      throw Error(`Unable to find version number in "${buildVersionFile}" with regex: ${buildVersionRegex}`)
    }

    const buildVersionNumber = buildVersionMatch[1]
    core.debug(`Found build version number: ${buildVersionNumber}`)
  
    // endsection


    // section getting PR task id from branch name
    const prNumber = getPrNumber()
    if (!prNumber) {
      throw Error(`Invalid PR Number`)
    }
    const token = core.getInput("repo-token", { required: true });
    const client: ClientType = github.getOctokit(token)

    const pullRequest = await client.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: prNumber,
    })
    const branchName = pullRequest.data.head.ref

    const taskIdRegex = new RegExp("(\d+)")
    const taskIdMatch = taskIdRegex.exec(branchName)
    if (taskIdMatch == null) {
      core.debug(`Unable to find task id in branch name ${branchName}`)
    } else {
      const taskId = taskIdMatch[1]
      core.debug(`Found task id ${taskId} and build version ${buildVersionNumber}`)
    }
    // endsection


  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
      return undefined;
  }
  
  return pullRequest.number;
}

run()
