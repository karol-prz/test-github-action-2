import fetch from 'node-fetch';
import * as core from '@actions/core'

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/11378468/bjrvyc0/"

export async function sendWebHook(buildVersionNumber: string, taskId: string): Promise<void> {
    let params = {
        buildVersionNumber: buildVersionNumber,
        taskId: taskId,
        fromColumn: core.getInput('fromColumn'),
        toColumn: core.getInput('toColumn'),
        chatChannelId: core.getInput('chatChannelId')
    };
    
    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    })
}