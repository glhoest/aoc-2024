import readFileIntoArray from "../utils/readFile.ts";

const input = await readFileIntoArray(`./files/${__filename.split('\\').at(-1).replace('.ts', '')}`)


function checkSafe(string: string): boolean {
    const data = string.split(' ').map(Number);
    const diffs: number[] = []
    let isSafe = true
    for (let i = 1; i < data.length; i++) {
        const a = data[i - 1];
        const b = data[i];
        const diff = a - b
        diffs.push(a - b);

        if (Math.abs(diff) > 3) {
            isSafe = false;
            break;
        }
        if (Math.abs(diff) === 0) {
            isSafe = false;
            break;
        }
    }
    if (isSafe) {
        const hasIncrease = diffs.some((d) => d > 0);
        const hasDecrease = diffs.some((d) => d < 0);

        if (hasIncrease && hasDecrease) {
            isSafe = false;
        }
    }
    return isSafe;
}

function part1() {
    let safeReports = 0
    for (const string of input) {
        let isSafe = checkSafe(string);
        if (isSafe) {
            safeReports++
        }
    }

    console.log(safeReports)
}

function part2() {
    let safeReports = input.filter(checkSafe).length;
    const unsafeReports = input.filter(s => !checkSafe(s));


    for (const string of unsafeReports) {
        const data = string.split(' ').map(Number);
        const diffs: number[] = []
        for (let i = 1; i < data.length; i++) {
            const a = data[i - 1];
            const b = data[i];
            const diff = a - b
            diffs.push(diff);
        }

        const overCharge = diffs.filter((d) => Math.abs(d) > 3).length;
        const stagnated = diffs.filter((d) => Math.abs(d) === 0).length;
        const increase = diffs.filter((d) => d > 0).length;
        const decrease = diffs.filter((d) => d < 0).length;


        if (increase && decrease) {
            if (increase === 1) {
                const indexA = diffs.findIndex((d) => d > 0)
                const indexB = indexA + 1

                const newDataA = data.toSpliced(indexA, 1)
                const newDataB = data.toSpliced(indexB, 1)


                if (checkSafe(newDataA.join(' '))) {
                    safeReports++ // todo risk of multiple increment per report
                } else if (checkSafe(newDataB.join(' '))) {
                    safeReports++ // todo risk of multiple increment per report
                }
            } else if (decrease === 1) {
                const indexA = diffs.findIndex((d) => d < 0)
                const indexB = indexA + 1

                const newDataA = data.toSpliced(indexA, 1)
                const newDataB = data.toSpliced(indexB, 1)

                if (checkSafe(newDataA.join(' '))) {
                    safeReports++ // todo risk of multiple increment per report
                } else if (checkSafe(newDataB.join(' '))) {
                    safeReports++ // todo risk of multiple increment per report
                }
            }
        } else if (stagnated === 1) {
            const indexA = diffs.findIndex((d) => Math.abs(d) === 0)
            const indexB = indexA + 1

            const newDataA = data.toSpliced(indexA, 1)
            const newDataB = data.toSpliced(indexB, 1)


            if (checkSafe(newDataA.join(' '))) {
                safeReports++ // todo risk of multiple increment per report
            }
        } else if (overCharge === 1) {
            const indexA = diffs.findIndex((d) => Math.abs(d) > 3)
            const indexB = indexA + 1

            const newDataA = data.toSpliced(indexA, 1)
            const newDataB = data.toSpliced(indexB, 1)


            if (checkSafe(newDataA.join(' '))) {
                safeReports++ // todo risk of multiple increment per report
            } else if (checkSafe(newDataB.join(' '))) {
                safeReports++ // todo risk of multiple increment per report
            }
        }
    }

    console.log(safeReports)
}

const fn = () => {
    console.log('part 1')
    part1();
    console.log('part 2')
    part2();
}

export default fn