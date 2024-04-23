import { LinkedList } from "./LinkedList.mjs";

export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  getIndex(key) {
    return this.hash(key) % this.buckets.length;
  }

  set(key, value) {
    const index = this.getIndex(key);

    if (!this.buckets[index]) {
      this.buckets[index] = LinkedList();
    }

    //Check if key already exists in the bucket
    /*for (let i = 0; i < this.buckets[index].length; i++) {
      const storedKey = this.buckets[index][i][1];
      if (storedKey === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }*/

    if(this.buckets[index].containsKey(key)){
      const keyIndex = this.buckets[index].findKey(key);

      this.buckets[index].removeAt(keyIndex);
      this.buckets[index].insertAt(keyIndex, value);
    }

    //this.buckets[index].push([key, value]);
    this.buckets[index].append(key, value);

    //Check load factor and resize if necessary
    if (this.checkLoadFactor()) {
      this.resize();
    }
  }

  resize() {
    const newCapacity = this.buckets.length * 2;
    const newBuckets = new Array(newCapacity);

    //Rehash all keys and push the pairs in the new hashmap
    this.buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach(([key, value]) => {
          const newIndex = this.hash(key) % newCapacity;
          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = [];
          }
          newBuckets[newIndex].push([key, value]);
        });
      }
    });

    this.buckets = newBuckets;
  }

  get(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];
    /*const findValue = this.buckets[index].find(
      ([storedKey, storedValue]) => storedKey === key
    );

    if (findValue) {
      return findValue;
    } else {
      return null;
    }*/

    const nodeIndex = bucket.findKey(key);
    return bucket.at(nodeIndex);
  }

  has(key) {
    const index = this.getIndex(key);

    if (!this.buckets[index]) return false;

    return this.buckets[index][0][0] === key;
  }

  remove(key) {
    if (this.has(key)) {
      const index = this.getIndex(key);
      this.buckets[index] = null;
    } else {
      return false;
    }
  }

  length() {
    return this.keys().length;
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        keys.push(bucket[0][0]);
      }
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        values.push(bucket[0][1]);
      }
    });
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        entries.push([bucket[0][0], bucket[0][1]]);
      }
    });

    return entries;
  }

  clear() {
    this.buckets.fill(null);
  }

  checkLoadFactor() {
    const ocuppiedBuckets = this.buckets.filter((i) => i !== null);
    return ocuppiedBuckets.length > this.buckets.length * this.loadFactor;
  }
}
