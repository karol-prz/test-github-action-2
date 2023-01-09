import fetch from 'node-fetch';

const WEBHOOK_URL = "https://google.com"

export async function sendWebHook(buildVersionNumber: string, taskId: string): Promise<void> {
    return new Promise(() => {
        fetch(WEBHOOK_URL).then(() => { return })
    })
}