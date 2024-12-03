import readFileIntoArray from "../utils/readFile.ts";
const input = await readFileIntoArray(`./files/${__filename.split('\\').at(-1).replace('.ts', '')}`)


const numberAscending: (a: number, b: number) => number = (a, b) => a - b

function part1() {
    let listA: number[] = []
    let listB: number[] = []

    input.forEach(item => {
        const ids = item.split("   ").map(Number);
        listA.push(ids[0])
        listB.push(ids[1])
    })


    listA = listA.sort(numberAscending)
    listB = listB.sort(numberAscending)

    const listC = []
    for (let i = 0; i < listA.length; i++) {
        const a = listA[i];
        const b = listB[i];


        listC.push(Math.abs(a - b));
    }

    console.log("day 1 part 1")
    console.log(listC.reduce((a, b) => a + b))
}

function part2() {
    let listA: number[] = []
    let listB: number[] = []

    input.forEach(item => {
        const ids = item.split("   ").map(Number);
        listA.push(ids[0])
        listB.push(ids[1])
    })

    const counts:number[] = []

    listB.forEach(item => {
        if(!counts[item]) counts[item] = 0
        counts[item]++
    })


    const listC = []
    for (let i = 0; i < listA.length; i++) {
        const a = listA[i];

        listC.push((counts[a]??0)*a);
    }

    console.log("day 1 part 2")
    console.log(listC.reduce((a, b) => a + b))
}

const fn = () => {
    console.log('part 1')
    part1();
    console.log('part 2')
    part2();
}

export default fn