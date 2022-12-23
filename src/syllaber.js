//http://www.lexique.org/
//https://github.com/chrplr/openlexicon/blob/master/scripts/french-syllabation/syllabation.awk
// Found at https://jsfiddle.net/kevinbalicot/yz8sa1j0/
const v = ['a', 'à', 'â', 'e', 'é', 'è', 'ê', 'i', 'ï', 'î', 'o', 'ô', 'u', 'ü', 'û', 'y'];

const c = ['b', 'c', 'ç', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];

const rules = [
  "(?=vc)ccv(?=gg)",
  "\\bvvc\\b",
  "\\bvvvc\\b",
  "\\bcvvc\\b",
  "\\bvvcc\\b",
  "\\bvcc\\b",
  "\\bccvc\\b",
  "\\bcvcc\\b",
  "\\bggvvvvcc\\b",
  "\\bcvccgg\\b",
  "\\bcvc(?=gu)",
  "gu(?=cv)",
  "guv(?=cv)",
  "guv(?=gg)",
  "guvc\\b",
  "guvc(?=cv)",
  "\cvvc(?=gu)",
  "gu\\b",
  "guv\\b",
  "guvv\\b",
  "guvvc\\b",
  "guvvcc\\b",
  "guvc\\b",
  "guvcc\\b",
  "cvc(?=gu)",
  "\\bvc(?=co)",
  "coo(?=cv)",
  "cooc\\b",
  "(?=vv)guc\\b",
  "(?=vv)guv\\b",
  "\\bvv(?=gu)",
  "\\bvv\\b",
  "\\bvc\\b",
  "\\bv\\b",
  "\\bv(?=gg)",
  "\\bc\\b",
  "\\bco",
  "\\bggvvvvc\\b",
  "ggvc(?=gu)",
  "ggvvv\\b",
  "ggvvvv\\b",
  "ggvvvvc\\b",
  "\\bggvvc\\b",
  "\\bggvvv\\b",
  "\\bggvcc\\b",
  "\\bggcv(?=gg)",
  "\\bggcv(?=cv)",
  "ggvvc(?=gg)",
  "cvggc\\b",
  "ocv",
  "oc",
  "\\bvc(?=gg)",
  "(?=c)ggvvcc\\b",
  "ggvvccc\\b",
  "\\bvvvcc\\b",
  "\\bggvvvc(?=cv)",
  "\\bggcv(?=cv)",
  "\\bcvvvvc(?=cv)",
  "\\bcvvv(?=gg)",
  "\\bcvcc(?=gg)",
  "cvgg\\b",
  "ccv\\b",
  "ccvc\\b",
  "gg\\b",
  "(?=cv)gg(?=cv)",
  "cvvv\\b",
  "cvvvv\\b",
  "cvvvvc\\b",
  "ggvvvcc\\b",
  "cvvccc\\b",
  "gvvc(?=cv)",
  "ggvv(?=gg)",
  "ggvvcc\\b",
  "ggcv\\b",
  "ggcvc\\b",
  "gggvc(?=cv)",
  "cvvvv(?=cv)",
  "cvvvvcc\\b",
  "cvvcc\\b",
  "cvvv\\b",
  "cvvvcc\\b",
  "cvvvvc\\b",
  "cvvvvvcc\\b",
  "cvvvc\\b",
  "cvvvc(?=cv)",
  "cvvv(?=c)",
  "\\bvcc(?=cv)",
  "\\bvvc(?=c)",
  "cvvc(?=gg)",
  "vc(?=gg)",
  "ggvvcc\\b",
  "ggvvvc\\b",
  "ggvccc\\b",
  "ggvvc\\b",
  "ggvv(?=c)",
  "ggv\\b",
  "ggvcc\\b",
  "ggvc\\b",
  "ggvc(?=cv)",
  "ggvc(?=cc)",
  "ggvc(?=gg)",
  "ggv(?=c)",
  "vc(?=gg)",
  "vcc(?=gg)",
  "vcc(?=cv)",
  "ggvv(?=c)",
  "ggvv\\b",
  "ggv(?=gg)",
  "cvccc\\b",
  "cvcc\\b",
  "cvcc(?=cv)",
  "cvvc(?=c)",
  "cvvc\\b",
  "\\bvc(?=cv)",
  "\\bccv(?=c)",
  "cvc(?=c)",
  "cvc\\b",
  "cvv(?=c)",
  "cvv(?=gg)",
  "cvc(?=c)",
  "cvc(?=gg)",
  "cvv\\b",
  "\\bvvv",
  "\\bvv(?=cv)",
  "\\bv(?=gg)",
  "cvv(?=cv)",
  "cv(?=cv)",
  "cv\\b",
  "vv(?=gg)",
  "cv",
  "v(?=cv)",
  "gg",
  "cc"
];

const getVC = word => {
  let result = '';
  word.split('').forEach(l => {
    if (v.includes(l)) {
      result += 'v';
    }

    if (c.includes(l)) {
      result += 'c';
    }
  });

  return result;
};

const getForm = (form, base) => {
  let match = ['bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fl', 'fr', 'gh', 'gl', 'gn', 'gr', 'gu', 'kl', 'kr', 'kh', 'kn', 'ph', 'pl', 'pr', 'rh', 'qu', 'tr', 'th', 'vr'];

  let match2 = ['oo', 'oé'];

  for (let i = 0; i < match.length; i++) {
    form = replaceOn(form, base, match[i], 'gg');
  }

  for (let i = 0; i < match2.length; i++) {
    form = replaceOn(form, base, match2[i], 'oo');
  }

  return replaceOn(form, base, 'gu', 'gu');
};

const replaceOn = (on, base, replace, by) => {
  const re = new RegExp(replace, 'g');
  const tab = on.split('');
  let m;
  while ((m = re.exec(base)) !== null) {
    tab.splice(re.lastIndex, by.length, ...by.split(''));
  }

  return tab.join('');
};

const syllabation = (term) => {
  const form = getForm(getVC(term), term);

  const result = [];
  const re = new RegExp(`(${rules.join('|')})`, 'g');
  const syl = form.match(re);

  let start = 0;
  let end = 0;
  for (let i = 0; i < syl.length; i++) {
    end += syl[i].length;
    result.push(term.substring(start, end));
    start = end;
  }

  return result;
};


class Sylabber {
  splitWord(expression) {
    return syllabation(expression);
  }

  split(text) {
    // remove delimiter
    const delimiter = '-';
    text = text.replace(new RegExp(delimiter, 'g'), '');

    // Split in words
    let words = text.match(/\S+\s*/g);
    let word;
    let result = [];
    for(word of words) {

      if(
        null != word && isNaN(word)  && isNaN(parseFloat(word))
      ) {
        word = this.splitWord(word).join(delimiter);
      }

      result.push(word);
    }
    return result.join(' ');
  }
}

export default Sylabber;
