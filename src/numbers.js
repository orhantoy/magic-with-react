function numbersForCard(nMax, index) {
  const bitMask = 1 << index;
  var numbers = []

  for (var i = 1; i <= nMax; i++) {
    var maskedNumber = i | bitMask;
    numbers.push(maskedNumber);
  }

  var uniqueNumbers = [...new Set(numbers)];
  uniqueNumbers.sort((a, b) => a - b);
  uniqueNumbers = uniqueNumbers.filter((n) => n <= nMax);

  return uniqueNumbers;
}

function numbersTableForCard(nMax, index) {
  var numbers = numbersForCard(nMax, index);
  var table = [];
  const nColumns = 6;

  while (numbers.length > 0) {
    var row = numbers.splice(0, nColumns);
    var nPad = nColumns - row.length;

    for (var i = 0; i < nPad; i++) {
      row.push(null);
    }

    table.push(row);
  }

  return table;
}

export default numbersTableForCard;
