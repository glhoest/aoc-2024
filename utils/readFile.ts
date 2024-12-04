import {readFile} from 'fs/promises';

export default async function readFileIntoArray(filePath: string): Promise<string[]> {
    try {
        const data = await readFile(filePath, 'utf-8');
        return data.split('\n').map(s=>s.trim()); // Split file content by new line
    } catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}