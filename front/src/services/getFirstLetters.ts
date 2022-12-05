export function getFirstLetters(str: string) {
  const firstLetters = str
    .split(' ')
    .map(word => word[0])
    .join('');

  return firstLetters;
}

export function capitalize(input: string) {
  if (input) {
    var words = input.split(' ');
    var CapitalizedWords: any = [];
    words.forEach(element => {
      CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
  }else{return ''}
}  