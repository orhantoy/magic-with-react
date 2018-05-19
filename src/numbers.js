function numbersForCard(index) {
  const bitMask = 1 << index;
  var numbers = []

  for (var i = 1; i <= 60; i++) {
    var maskedNumber = i | bitMask;
    numbers.push(maskedNumber);
  }

  var uniqueNumbers = [...new Set(numbers)];
  uniqueNumbers.sort((a, b) => a - b);
  uniqueNumbers = uniqueNumbers.filter((n) => n <= 60);

  return uniqueNumbers;
}

function numbersTableForCard(index) {
  var numbers = numbersForCard(index);
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
