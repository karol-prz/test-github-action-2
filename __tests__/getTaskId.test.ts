import * as core from '@actions/core'
import {getTaskId} from '../src/getTaskId'
import {expect, test, jest, describe, beforeEach} from '@jest/globals'

describe('getTaskId', () => {
  beforeEach(() => {
    // Reset the process.env object before each test
    process.env = {}
  })

  test('should throw an error if the branch name is not found', async () => {
    await expect(getTaskId()).rejects.toThrow(
      'Branch name is not found, is this being run in a pull request?'
    )
  })

  test('should return the task ID if it is found in the branch name', async () => {
    process.env.GITHUB_HEAD_REF = 'refs/heads/test/12345/bug_fix'
    await expect(getTaskId()).resolves.toBe('12345')
  })

  test('should return undefined if the task ID is not found in the branch name', async () => {
    process.env.GITHUB_HEAD_REF = 'refs/heads/test/bug_fix'
    await expect(getTaskId()).resolves.toBe(undefined)
  })

  test('should debug the task ID if it is found in the branch name', async () => {
    process.env.GITHUB_HEAD_REF = 'refs/heads/test/12345/bug_fix'
    jest.spyOn(core, 'debug').mockImplementation(() => {})
    await getTaskId()
    expect(core.debug).toHaveBeenCalledWith('Found task id 12345')
  })

  test('should debug a message if the task ID is not found in the branch name', async () => {
    process.env.GITHUB_HEAD_REF = 'refs/heads/test/bug_fix'
    jest.spyOn(core, 'debug').mockImplementation(() => {})
    await getTaskId()
    expect(core.debug).toHaveBeenCalledWith(
      'Unable to find taskId in branch name test/bug_fix'
    )
  })
})
