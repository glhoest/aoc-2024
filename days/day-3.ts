import readFileIntoArray from "../utils/readFile.ts";
const input = await readFileIntoArray(`./files/${__filename.split('\\').at(-1).replace('.ts', '')}`)
    const mulRegex = /mul\((\d*?),(\d*?)\)/g


function part1() {
    const multiplicationResults = []
    for (const line of input) {
        const matches = line.matchAll(mulRegex)
        if (matches) {
            for (const match of matches) {
                multiplicationResults.push(Number.parseInt(match[1]) * Number.parseInt(match[2]))
            }
        }
    }
    console.log(multiplicationResults.reduce((acc, curr) => acc+curr, 0))
}

function part2() {
    const program = input
        .join()
        .split('do()')
        .map(s=>s.split("don't()")[0])
        .join()


    const multiplicationResults = []
    const matches = program.matchAll(mulRegex)
    if (matches) {
        for (const match of matches) {
            multiplicationResults.push(Number.parseInt(match[1]) * Number.parseInt(match[2]))
        }
    }
    console.log(multiplicationResults.reduce((acc, curr) => acc+curr, 0))
}

const fn = () => {
    console.log('part 1')
    part1();
    console.log('part 2')
    part2();
}

export default fn