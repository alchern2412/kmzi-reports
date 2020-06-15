let bit0 = '\u0020' //space
let bit1 = '\u00A0' //NO-BREAK space

// Конвертир. из 8бит в 10бит сроку
function tobits(data) {
	let bits = '';

	for (let i = 0; i < data.length; i++) {
		let c = data.charCodeAt(i);

		bits += bit1;
		bits += (c & 128) ? bit1 : bit0;
		bits += (c &  64) ? bit1 : bit0;
		bits += (c &  32) ? bit1 : bit0;
		bits += (c &  16) ? bit1 : bit0;
		bits += (c &   8) ? bit1 : bit0;
		bits += (c &   4) ? bit1 : bit0;
		bits += (c &   2) ? bit1 : bit0;
		bits += (c &   1) ? bit1 : bit0;
		bits += bit0;
	}
	return bits
}


function checksync(bits, i, n) {
	for (let j = i; j < i + 10 * n; j += 10) {
		if (j + 9 < bits.length) {
			if (bits[j + 0] != bit1) return false;
			if (bits[j + 9] != bit0) return false;
		}
	}
	return true
}


// проверка синхронизации 
function frombits(bits) {
	let insync = checksync(bits, 0, 1);
	let data   = '';
	console.log(bits.length)

	for (let i = 0; i < bits.length; ) {
		if (insync) {
			if (checksync(bits, i, 1)) {
				let c = 0;

				if (bits[i + 1] == bit1) c |= 128
				if (bits[i + 2] == bit1) c |=  64
				if (bits[i + 3] == bit1) c |=  32
				if (bits[i + 4] == bit1) c |=  16
				if (bits[i + 5] == bit1) c |=   8
				if (bits[i + 6] == bit1) c |=   4
				if (bits[i + 7] == bit1) c |=   2
				if (bits[i + 8] == bit1) c |=   1

				data += String.fromCharCode(c);
				console.log('|'+data+'|')

				i += 10;
			} 
			else {
				insync = false;
			}
		} 
		else {
			if (checksync(bits, i, 4))
				insync = true;
			else
				i += 1;
		}
	}
	return data;
}

function istext(c) {
	return (c != '\u0020' && c != '\u00A0' && c != '\t');
}
// проверка на конец строки
function iseol(c) {
	return (c == '\n');
}

// Декодирование
function decode(data) {
	let intext = false;
	let bits   = '';

	for (let i = 0; i < data.length; i++) {
		if (intext) {
			if (data[i] == bit0)
				bits += bit0;
			if (data[i] == bit1)
				bits += bit1;
			console.log('bit'+bits + '| |' + bit1 + '| |' + bit0)
		}

		if (istext(data[i])) intext = true;
		if (iseol (data[i])) intext = false;
	}
	return bits;
}


// Зашифрование пустыми пробелами
function encode(text, bits) {
	let intext = false;
	let data   = '';
	let j      = 0;

	for (let i = 0; i < text.length; i++) {
		if (intext && j < bits.length && (text[i] == bit0 || text[i] == bit1))
			data += bits[j++];
		else
			data += text[i];

		if (istext(text[i])) intext = true;
		if (iseol (text[i])) intext = false;
	}
	return data;
}

// Удаление белых маркеров
function sanitize(data) {
	return data.replace(/\u00A0/g, '\u0020');
}