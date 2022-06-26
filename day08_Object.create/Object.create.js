function myObjectCreate(proto) {
  if(proto === null || typeof proto !== "object") {
    throw new Error(`Expected object but received ${proto === null ? "null" : typeof proto}`)
  }
  
  function F() {}
  F.prototype = proto;
  return new F();
}