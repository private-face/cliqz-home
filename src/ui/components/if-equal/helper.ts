export default function ifEqual([a, b, ifTrue, ifFalse]) {
  if (a === b) {
    return ifTrue;
  } else {
    return ifFalse;
  }
};
