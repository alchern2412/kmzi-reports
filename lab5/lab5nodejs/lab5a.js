// 1. Маршрутная перестановка (маршрут запись –
// по столбцам, считывание – по строкам таблицы;
// параметры таблицы – по указанию преподавателя)
const util = require('./lab5util')
const fs = require('fs')

const originalText = fs.readFileSync('./original.txt', 'utf-8')
// const originalText = 'Krzysztof to Ukrainiec, mieszkający obecnie w Polsce, który bardzo lubi odwiedzać polskie miasta, by poznawać ich historię, kulturę kraju i oglądać zabytki. Kolejny weekend to kolejna wyprawa – tym razem do Krakowa. Zamiast pociągu Krzysztof zdecydował się na podróż samochodem ze swoją polską przyjaciółką Anią, która już zna Nie planują zbyt wiele, ponieważ Ania jest bardzo spontaniczną osobą, która ciągle zmienia zdanie. Krzysztof chciałby zobaczyć zabytki, Ania – wolałaby iść na koncert do filharmonii. Co wyjdzie z ich planów? Od razu po przyjeździe udało im się uniknąć korków i zobaczyć Rynek Główny, to ulubione miejsce dla wszystkich turystów, którzy jeszcze nie byli w Krakowie. Atmosfera jest tu szczególna – to zasługa okolicznych zabytków: Sukiennic, kościoła Mariackiego, wieży ratuszowej, kościoła św. Wojciecha i przepięknych starych kamienic. Kolejnym etapem wycieczki był Zamek Królewski na Wawelu, położony jest na Wzgórzu Wawelskim, który był siedzibą wielu polskich władców, zabytek ten został wpisany na Listę Światowego Dziedzictwa Kulturowego UNESCO.'
// const originalText = 'В javascript отсутствует деление на целые числа и числа с плавающей запятой. Возможно, как следствие, отсутствуют и специальные арифметические операторы для целых чисел. Исходя из этого есть несколько вариантов решения'

console.log('originalText:', originalText)

const cols = 10  // 10 cols

let time = Date.now()
const encryptedText = util.encrypt(originalText, cols)
console.log('Encryption Time', Date.now() - time)
console.log('encryptedText:', encryptedText)

time = Date.now()
const decryptedText = util.decrypt(encryptedText, cols)
console.log('Decryption Time', Date.now() - time)
console.log('decryptedText:', decryptedText)


console.log('Histogram of Original Text')
util.printHistogram(originalText)

console.log('----------------------')
console.log('Histogram of Encrypted Text')
util.printHistogram(encryptedText)