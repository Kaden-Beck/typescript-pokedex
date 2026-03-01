export function cleanInput(input: string): string[] {
    let cleanOutput: string[] = input.trim().split(/\s+/);

    for (let i = 0; i < cleanOutput.length; i++) {
        cleanOutput[i] = cleanOutput[i].toLowerCase().trim();
    }
    
    return cleanOutput;
}