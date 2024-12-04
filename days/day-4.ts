import readFileIntoArray from "../utils/readFile.ts";

const input = (await readFileIntoArray(`./files/${__filename.split('\\').at(-1).replace('.ts', '')}`)).map(line => [...line]) as xmasLetter[][]

const rowLength = input.length;
const colLength = input[0].length;

type Coordinate = [row: number, col: number]
type xmasLetter = 'X' | 'M' | 'A' | 'S'

const isValidPattern = (pattern: Coordinate[], rowI: number, colI: number) => {
    for (const [rowMod, colMod] of pattern) {
        const nextRow = rowI + rowMod
        const nextCol = colI + colMod
        if (nextRow < 0 || nextRow >= rowLength) return false
        if (nextCol < 0 || nextCol >= colLength) return false
    }
    return true;
};


function isXmas([xMod, mMod, aMod, sMod]: Coordinate[], rowI: number, colI: number) {
    try {
        const xCoord: Coordinate = [xMod[0] + rowI, xMod[1] + colI]
        const mCoord: Coordinate = [mMod[0] + rowI, mMod[1] + colI]
        const aCoord: Coordinate = [aMod[0] + rowI, aMod[1] + colI]
        const sCoord: Coordinate = [sMod[0] + rowI, sMod[1] + colI]

        if (input[xCoord[0]][xCoord[1]] !== 'X') return false
        if (input[mCoord[0]][mCoord[1]] !== 'M') return false
        if (input[aCoord[0]][aCoord[1]] !== 'A') return false
        if (input[sCoord[0]][sCoord[1]] !== 'S') return false
        return true
    } catch (error) {
        return false
    }
}

/**
 * input[Y][X]
 * input[row][col]
 * [0][0] is top left
 */
function part1(): string {
    let totalHits = 0

    const patterns: Coordinate[][] = [
        [[0, 0], [0, 1], [0, 2], [0, 3]], // x forward
        [[0, 0], [0, -1], [0, -2], [0, -3]], // x backwards

        [[0, 0], [1, 0], [2, 0], [3, 0]], // y forward
        [[0, 0], [-1, 0], [-2, 0], [-3, 0]], // y backwards

        [[0, 0], [1, 1], [2, 2], [3, 3]], // diag down right
        [[0, 0], [-1, -1], [-2, -2], [-3, -3]], // diag up left

        [[0, 0], [1, -1], [2, -2], [3, -3]], // diag down left
        [[0, 0], [-1, 1], [-2, 2], [-3, 3]] //diag up right
    ]

    for (let rowI = 0; rowI < input.length; rowI++) {
        const row = input[rowI];
        for (let colI = 0; colI < row.length; colI++) {
            const currentChar: xmasLetter = input[rowI][colI]

            if (currentChar !== 'X' && currentChar !== 'S') continue;

            for (const pattern of patterns) {
                if (isXmas(pattern, rowI, colI)) totalHits++
            }
        }
    }


    return totalHits.toString()
}

function is2DMatch(pattern: ((string | undefined)[])[], rowI: number, colI: number) {
    try {
        for (let patternRowI = 0; patternRowI < pattern.length; patternRowI++) {
            const patternRow = pattern[patternRowI];
            for (let patternColI = 0; patternColI < patternRow.length; patternColI++) {
                const patternChar = patternRow[patternColI];
                if (patternChar === undefined) continue;

                let row = rowI + patternRowI;
                let col = colI + patternColI;

                if (row >= rowLength || col >= colLength) return false;

                const currentChar = input[row][col];
                if (currentChar !== patternChar) return false;
            }
        }

        return true;
    } catch (e) {
        return false

    }
}

function part2(): string {
    const mPatterns = [
        [
            ['M', , 'S'],
            [, 'A',],
            ['M', , 'S'],
        ],
        [
            ['M', , 'M'],
            [, 'A',],
            ['S', , 'S'],
        ],
    ]
    const sPatterns = [
        [
            ['S', , 'M'],
            [, 'A',],
            ['S', , 'M'],
        ],
        [
            ['S', , 'S'],
            [, 'A',],
            ['M', , 'M'],
        ],
    ]

    let hits = 0
    for (let rowI = 0; rowI < input.length - 2; rowI++) {
        const row = input[rowI];
        checkerloop:for (let colI = 0; colI < row.length - 2; colI++) {
            const currentChar: xmasLetter = input[rowI][colI]

            if (currentChar === 'M') {
                for (const pattern of mPatterns) {
                    if (is2DMatch(pattern, rowI, colI)) {
                        hits++
                        continue checkerloop;
                    }
                }
            }

            if (currentChar === 'S') {
                for (const pattern of sPatterns) {
                    if (is2DMatch(pattern, rowI, colI)) {
                        hits++
                        continue checkerloop;
                    }
                }
            }
        }
    }


    return hits.toString()
}

function part1Try2(): string {
    const xPatterns = [
        [
            ['X', 'M', 'A', 'S']
        ],
        [
            ['X'],
            ['M'],
            ['A'],
            ['S'],
        ],
        [
            ['X'],
            [, 'M'],
            [, , 'A'],
            [, , , 'S'],
        ]
    ]
    const xPatternBackwards = [
        [, , , 'X'],
        [, , 'M'],
        [, 'A'],
        ['S'],
    ]
    const sPatterns = [
        [
            ['S', 'A', 'M', 'X']
        ],
        [
            ['S'],
            ['A'],
            ['M'],
            ['X'],
        ],
        [
            ['S'],
            [, 'A'],
            [, , 'M'],
            [, , , 'X'],
        ]
    ]
    const sPatternBackwards = [
        [, , , 'S'],
        [, , 'A'],
        [, 'M'],
        ['X'],
    ]

    let hits = 0
    for (let rowI = 0; rowI < input.length; rowI++) {
        const row = input[rowI];
        for (let colI = 0; colI < row.length; colI++) {
            const currentChar: xmasLetter = input[rowI][colI]

            if (currentChar === 'X') {
                for (const pattern of xPatterns) {
                    if (is2DMatch(pattern, rowI, colI)) {
                        hits++
                    }
                }

                if (is2DMatch(xPatternBackwards, rowI, colI-3)) {
                    hits++
                }
            }

            if (currentChar === 'S') {
                for (const pattern of sPatterns) {
                    if (is2DMatch(pattern, rowI, colI)) {
                        hits++
                    }
                }

                if (is2DMatch(sPatternBackwards, rowI, colI-3)) {
                    hits++
                }
            }
        }
    }

    return hits.toString()
}

const fn = () => {
    // console.log('part 1: ', part1());
    console.log('part 1 MOD: ', part1Try2());
    console.log('part 2: ', part2());
}

export default fn