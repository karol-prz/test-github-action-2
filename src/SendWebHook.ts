import fetch from 'node-fetch';

const WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/11378468/bjrvyc0/"

export async function sendWebHook(buildVersionNumber: string, taskId: string, fromColumn: string, toColumn: string, chatChannelId: string): Promise<void> {
    let params = {
        buildVersionNumber: buildVersionNumber,
        taskId: '33918298',//todo
        fromColumn: fromColumn,
        toColumn: toColumn,
        chatChannelId: chatChannelId
    };
    
    fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    })
}