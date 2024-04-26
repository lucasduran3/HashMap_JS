import Node from "./Node.mjs";

const LinkedList = () => {
  let HEAD = null;

  const prepend = (key, value) => {
    let temp = null;
    if (HEAD !== null) temp = HEAD;
    HEAD = new Node(key, value);
    HEAD.nextNode = temp;
  };

  const append = (key, value) => {
    if (HEAD === null) prepend(key, value);
    else {
      let temp = HEAD;
      while (temp.nextNode !== null) {
        temp = temp.nextNode;
      }
      temp.nextNode = new Node(key, value);
    }
  };

  const size = () => {
    let temp = HEAD;
    let c = 0;

    while (temp !== null) {
      c++;
      temp = temp.nextNode;
    }
    return c;
  };

  const head = () => {
    return HEAD;
  };

  const tail = () => {
    let temp = HEAD;

    while (temp.nextNode !== null) {
      temp = temp.nextNode;
    }
    return temp;
  };

  const at = (index) => {
    let temp = HEAD;
    let c = 0;

    if (index < size || index > size)
      return console.error("Index outside of bounds");

    while (c < index) {
      temp = temp.nextNode;
      c++;
    }

    return temp.value;
  };

  const pop = () => {
    let temp = HEAD;

    while (temp.nextNode.nextNode !== null) {
      temp = temp.nextNode;
    }

    temp.nextNode = null;
  };

  const containsValue = (value) => {
    let temp = HEAD;

    while (temp !== null) {
      if (temp.value === value) return true;
      temp = temp.nextNode;
    }

    return false;
  };

  const containsKey = (key) => {
    let temp = HEAD;

    while (temp !== null) {
      if (temp.key === key) return true;
      temp = temp.nextNode;
    }

    return false;
  };

  const findValue = (value) => {
    let temp = HEAD;
    let c = 0;

    while (temp !== null) {
      if (temp.value === value) return c;
      temp = temp.nextNode;
      c++;
    }

    return null;
  };

  const findKey = (key) => {
    let temp = HEAD;
    let c = 0;

    while (temp !== null) {
      if (temp.key === key) return c;
      temp = temp.nextNode;
      c++;
    }

    return null;
  };

  const insertAt = (index, value) => {
    let temp = HEAD;
    let c = 1;

    if (index < size || index > size) {
      return console.error("Index outside of bounds");
    }

    while (c < index) {
      temp = temp.nextNode;
      c++;
    }

    const before = temp;
    const after = temp.nextNode;

    temp = new Node(value);
    temp.nextNode = after;
    before.nextNode = temp;
  };

  const removeAt = (index) => {
    let temp = HEAD;
    let c = 0;

    if (index < size || index > size) {
      return console.error("Index outside of bounds");
    }

    while (c < index) {
      temp = temp.nextNode;
      c++;
    }

    temp.nextNode = null;
  };

  const keys = () => {
    const keys = [];
    let temp = HEAD;

    while (temp !== null) {
      keys.push(temp.key);
      temp = temp.nextNode;
    }

    return keys;
  };

  const values = () => {
    const values = [];
    let temp = HEAD;

    while (temp !== null) {
      values.push(temp.value);
      temp = temp.nextNode;
    }

    return values;
  };

  const pairKeyValues = () => {
    const pairs = [];
    let temp = HEAD;

    while (temp !== null) {
      pairs.push(temp.key, temp.value);
      temp = temp.nextNode;
    }
    return pairs;
  };

  const toString = () => {
    let result = "";
    let temp = HEAD;

    while (temp !== null) {
      result += `(${temp.value}) -> `;
      temp = temp.nextNode;
    }

    result += " null";

    return result;
  };

  return {
    prepend,
    append,
    size,
    head,
    tail,
    at,
    pop,
    containsValue,
    containsKey,
    findValue,
    findKey,
    insertAt,
    keys,
    values,
    pairKeyValues,
    removeAt,
    toString,
  };
};

export { LinkedList };
