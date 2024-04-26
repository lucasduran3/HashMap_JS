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

    if (this.buckets[index].containsKey(key)) {
      const keyIndex = this.buckets[index].findKey(key);

      this.buckets[index].removeAt(keyIndex);
      this.buckets[index].insertAt(keyIndex, value);
    }

    this.buckets[index].append(key, value);

    if (this.checkLoadFactor()) {
      this.resize();
    }
  }

  //TODO
  resize() {
    const newCapacity = this.buckets.length * 2;
    const newBuckets = new Array(newCapacity);

    //Rehash all keys and push the pairs in the new hashmap
    this.buckets.forEach((bucket) => {
      if (bucket) {
        bucket.forEach((node) => {
          const newIndex = this.hash(node.key) % newCapacity;
          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = LinkedList();
          }
          newBuckets[newIndex].append(node.key, node.value);
        });
      }
    });

    this.buckets = newBuckets;
  }

  get(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];
    const nodeIndex = bucket.findKey(key);
    return bucket.at(nodeIndex);
  }

  has(key) {
    const index = this.getIndex(key);
    const bucket = this.buckets[index];

    if (!bucket) return false;
    return bucket.containsKey(key);
  }

  remove(key) {
    if (this.has(key)) {
      const index = this.getIndex(key);
      const bucket = this.buckets[index];
      const indexKey = bucket.findKey(key);
      bucket.removeAt(indexKey);
      return true;
    } else {
      return false;
    }
  }

  //---TODO
  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        keys.push(bucket.keys());
      }
    });
    keys.flat();
    return keys;
  }

  length() {
    return this.keys().length;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        values.push(bucket.values());
      }
    });
    values.flat();
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        entries.push(bucket.pairKeyValues());
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
