import fs from 'fs'
import path from 'path'

console.log("Hello via Bun!");


async function runDays() {
    const daysDirectory = './days';

    const files = fs.readdirSync(daysDirectory)
        .filter(file => file.startsWith('day-') && file.endsWith('.ts'))
        .sort((a, b) => {
            const aNum = parseInt(a.match(/\d+/)[0], 10);
            const bNum = parseInt(b.match(/\d+/)[0], 10);
            return aNum - bNum;
        });

        console.log('--------------------------------------------------')
    for (const file of files) {
        console.log()
        console.log(file.replace('.ts','').toUpperCase())
        const dayModule = await import(`./days/${file}`);

        performance.mark('mark1');
        dayModule.default();
        performance.mark('mark2');
        const measure = performance.measure(`${file}_time`, 'mark1', 'mark2')

        console.log(`${file} time: ${measure.duration.toFixed(3)}ms`);

        console.log('--------------------------------------------------')
    }
}

runDays().catch(console.error);
