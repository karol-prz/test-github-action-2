import fetch from 'node-fetch';

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/11378468/bjrvyc0/"

export async function sendWebHook(
    buildVersionNumber: string, 
    taskId: string, 
    hasPRColumn: string, 
    mergedColumn: string,
    approvedColumn: string,
    chatChannelId: string
): Promise<void> {
    let params = {
        buildVersionNumber: buildVersionNumber,
        taskId: taskId,
        hasPRColumn: hasPRColumn,
        mergedColumn: mergedColumn,
        approvedColumn: approvedColumn,
        chatChannelId: chatChannelId
    };
    
    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    })
}