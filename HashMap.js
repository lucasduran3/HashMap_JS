class HashMap {
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
      this.buckets[index] = [];
    }

    //Check if key already exists in the bucket
    for (let i = 0; i < this.buckets[index].length; i++) {
      const storedKey = this.buckets[index][i][1];
      if (storedKey === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);

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
    const findValue = this.buckets[index].find(
      ([storedKey, storedValue]) => storedKey === key
    );

    if (findValue) {
      return findValue;
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.getIndex(this.hash(key));
    return this.buckets[index] !== null;
  }

  checkLoadFactor() {
    const ocuppiedBuckets = this.buckets.filter((i) => i !== null);
    return ocuppiedBuckets.length > this.buckets.length * this.loadFactor;
  }
}
