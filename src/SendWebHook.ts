import fetch from 'node-fetch';

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/11378468/bjrvyc0/"

export async function sendWebHook(buildVersionNumber: string, taskId: string): Promise<void> {
    let params = {
        buildVersionNumber: buildVersionNumber,
        taskId: taskId
    };
    
    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    })
}