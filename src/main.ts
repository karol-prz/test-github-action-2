import * as core from '@actions/core'
import * as github from "@actions/github";
import { readFileSync } from 'fs'
import { execSync } from 'child_process'


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

    const branchName = executeGitCommand('git rev-parse --abbrev-ref HEAD')

    core.debug(`Pull request branch name: ${branchName}`)
    // endsection


  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function executeGitCommand(command : string) {
  return execSync(command)
    .toString('utf8')
    .replace(/[\n\r\s]+$/, '');
}

run()
