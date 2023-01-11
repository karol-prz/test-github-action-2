import {expect, test, jest} from '@jest/globals'
import {readFileSync} from 'fs'
import {getBuildVersionNumber} from '../src/getBuildVersionNumber'

test('getBuildVersionNumber throws error when regex does not match', async () => {
  const mockReadFileSync = jest.fn().mockReturnValue('file contents')
  ;(readFileSync as any) = mockReadFileSync

  await expect(
    getBuildVersionNumber('file.txt', 'invalid-regex')
  ).rejects.toThrow(
    'Unable to find version number in "file.txt" with regex: invalid-regex'
  )
})

test('getBuildVersionNumber returns build version number', async () => {
  const mockReadFileSync = jest.fn().mockReturnValue('version: 1.0.0')
  ;(readFileSync as any) = mockReadFileSync

  const buildVersionNumber = await getBuildVersionNumber(
    'file.txt',
    'version: (\\d+\\.\\d+\\.\\d+)'
  )
  expect(buildVersionNumber).toEqual('1.0.0')
})
