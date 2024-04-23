import HashMap from "./HashMap.mjs";

const hashmap = new HashMap(16,0.75);
hashmap.set("Carlos", 44235640);
hashmap.set("Lucia", 44365789);

console.log(hashmap.get("Carlos"));