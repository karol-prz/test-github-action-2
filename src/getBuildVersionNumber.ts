import * as core from '@actions/core'
import { readFileSync } from 'fs'

export async function getBuildVersionNumber(
  buildVersionFile: string,
  buildVersionRegex: string
): Promise<string> {
  const file = readFileSync(`${buildVersionFile}`, 'utf-8')
  const regex = new RegExp(buildVersionRegex)

  const buildVersionMatch = regex.exec(file)

  if (buildVersionMatch == null) {
    throw Error(
      `Unable to find version number in "${buildVersionFile}" with regex: ${buildVersionRegex}`
    )
  }

  const buildVersionNumber = buildVersionMatch[1]
  core.debug(`Found build version number ${buildVersionNumber}`)
  return buildVersionNumber
}
