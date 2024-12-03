import readFileIntoArray from "../utils/readFile.ts";
const input = await readFileIntoArray(`./files/${__filename.split('\\').at(-1).replace('.ts', '')}`)


function part1() {

}

function part2() {
}

const fn = () => {
    console.log('part 1')
    part1();
    console.log('part 2')
    part2();
}

export default fn