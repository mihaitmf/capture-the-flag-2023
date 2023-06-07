const inputRaw = 'd3 d3 76 34 86 54 97 36 c6 46 d6 26 c6 87 74 ' +
    '26 86 86 23 95 76 15 84 56 c6 53 74 94 c6 86 ' +
    '74 46 76 76 74 46 07 46 84 94 27 e4 75 46 37 ' +
    '24 34 a5 67 93 23 25 b4 f6 15 66 97 14 44 d4 ' +
    '77 94 45 d4 a6 64 d6 d4 03 94 44 d4 47 94 75 ' +
    'a5 87 54 75 c4 b6 65 75 d4 87 03 97 e4 43 14 ' +
    'a7 e4 47 76 44 a5 97 15 74 d4 03 76 a6 d4 73 ' +
    'a5 54 65 44 07 76 34 86 54 97 a5 57 c6 d6 56 ' +
    '86 13 75 95 76 55 d6 36 e6 55 33 26 53 24 34 ' +
    'c4 c6 13 23 26 a7 65 23 46 86 24 96 26 86 86 ' +
    '74 46 76 55 d6 36 67 13 74 94 c6 a4 33 a4 13 ' +
    '93 75 75 b4 f6 15 94 86 83 74 26 37 65 74 35';
console.log(inputRaw);

const input = inputRaw.split(' ');
console.log(input);

console.log('d3'.split('').reverse().join(''));
// console.log(parseInt('76', 16));
// console.log(String.fromCharCode(parseInt('35', 16)));

let result = '';
for (const i of input) {
    // result += String.fromCharCode(parseInt(i, 16));
    let reversedHexChar = i.split('').reverse().join('');
    result += String.fromCharCode(parseInt(reversedHexChar, 16));
}
console.log(result);

const resultReversed = result.split('').reverse().join('')
console.log(resultReversed);

const resultReversedDecoded = Buffer.from(resultReversed, 'base64').toString();
console.log(resultReversedDecoded);

