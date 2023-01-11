import fetch from 'node-fetch';

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/11378468/bjrvyc0?"

export async function sendWebHook(buildVersionNumber: string, taskId: string): Promise<void> {
    let params = new URLSearchParams({
        buildVersionNumber: buildVersionNumber,
        taskId: taskId,
    })
    
    fetch(WEBHOOK_URL + params)
}