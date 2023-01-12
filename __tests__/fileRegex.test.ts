import { getBuildVersionNumber } from '../src/getBuildVersionNumber'
import { expect, test } from '@jest/globals'

test('getBuildVersionNumber works with build.gradle and its regex', async () => {
  const buildVersionFile = `__tests__/build.gradle`
  const buildVersionRegex = 'projectsAppVersionName = "(.*)"'
  const expectedBuildVersionNumber = '3.27.2'

  const buildVersionNumber = await getBuildVersionNumber(
    buildVersionFile,
    buildVersionRegex
  )

  expect(buildVersionNumber).toBe(expectedBuildVersionNumber)
})

test('getBuildVersionNumber works with Info.plist and its regex', async () => {
  const buildVersionFile = `__tests__/Info.plist`
  const buildVersionRegex =
    'CFBundleShortVersionString</key>\n\t<string>(.*)</string>'
  const expectedBuildVersionNumber = '3.18.0'

  const buildVersionNumber = await getBuildVersionNumber(
    buildVersionFile,
    buildVersionRegex
  )

  expect(buildVersionNumber).toBe(expectedBuildVersionNumber)
})
