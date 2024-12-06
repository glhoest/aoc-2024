import readFileIntoArray from "../utils/readFile.ts";

const input = (await readFileIntoArray(`./files/${__filename.split('\\').at(-1).replace('.ts', '')}`))

const inputSeparator = input.findIndex(line => line.trim().length === 0)

type OrderRule = {
    before: number
    after: number
}
const orderRules: OrderRule[] = input.slice(0, inputSeparator)
    .map(line => line.split('|').map(Number))
    .map(numbers => ({before: numbers[0], after: numbers[1]}))

const updates: number[][] = input.slice(inputSeparator + 1, input.length)
    .map(line => line.split(',').map(Number))

const buildIndexMap = (update: number[]) => {
    const map = new Map<number, number[]>([...new Set(update)].map(num => [num, []]))
    for (let i = 0; i < update.length; i++) {
        const num = update[i];
        map.get(num)?.push(i)
    }
    return map
};

function checkRuleOnUpdate(relevantRule: OrderRule, indexMap: Map<number, number[]>) {
    const indexBefore = indexMap.get(relevantRule.before)![0]//assume each page only occurs once
    const indexAfter = indexMap.get(relevantRule.after)![0]
    if (indexBefore < indexAfter) return true;
    return false;
}

const correctUpdates: number[][] = []
const incorrectUpdates: number[][] = []

function part1(): string {
    let countOfMiddleNumbers = 0

    updateLoop:for (const update of updates) {
        const indexMap = buildIndexMap(update)
        const relevantRules = orderRules.filter(rule => indexMap.has(rule.before) && indexMap.has(rule.after))
        for (const relevantRule of relevantRules) {
            if (!checkRuleOnUpdate(relevantRule, indexMap)) {
                incorrectUpdates.push(update)
                continue updateLoop;
            }
        }

        correctUpdates.push(update)
        countOfMiddleNumbers += update[Math.floor(update.length / 2)]
    }

    return countOfMiddleNumbers.toString()
}

function byRelevantRules(relevantRules: OrderRule[]) {
    return (a: number, b: number) => {
        const rule = relevantRules
            .find(rule => (rule.before === a && rule.after === b)
                || (rule.before === b && rule.after === a))


        if(!rule) return 0

        if (rule.before === a) return a-b;
        if (rule.before === b) return b-a;
        return 0
    };
}

function part2(): string {
    let countOfMiddleNumbers = 0
    const fixedUpdates = incorrectUpdates.map(update => {
        const uniqueNumbers = new Set(update)
        const relevantRules = orderRules.filter(rule => uniqueNumbers.has(rule.before) && uniqueNumbers.has(rule.after))
        return update.sort(byRelevantRules(relevantRules));
    })

    fixedUpdates.forEach(update => {
        countOfMiddleNumbers += update[Math.floor(update.length / 2)]
    })

    return countOfMiddleNumbers.toString()
}

const fn = () => {
    console.log('part 1: ', part1());
    console.log('part 2: ', part2());
}

export default fn