import HashMap from "./HashMap.mjs";

const hashmap = new HashMap(16, 0.75);

//add 5 values to hashmap
hashmap.set("Carlos", 41235640);
hashmap.set("Lucia", 42365789);
hashmap.set("Lucas", 43453189);
hashmap.set("Alberto", 44365789);
hashmap.set("Esteban", 45365789);


console.log(`initial hashmap structure: \n`, hashmap.entries());
console.log(`get the value of key Carlos: ${hashmap.get("Carlos")}`);
console.log(`check if hashmap contains the key Lucas: ${hashmap.has("Lucas")}`);
hashmap.remove("Lucas");
console.log(`remove the key Lucas: \n`, hashmap.entries());
console.log(`get keys: ${hashmap.keys()}`);
console.log(`get values: ${hashmap.values()}`);
console.log(`length of hashmap: ${hashmap.length()}`);
hashmap.clear();
console.log(`clear the hashmap: \n`, hashmap.entries());

