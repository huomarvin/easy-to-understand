class MyTransform {
  constructor() {
    this.headerLen = 8;
    this.sequence = 0;
    this.bodyLen = 4;
    this.sequenceNumber = 1;
  }
  encode(chunk) {
    const buffer = Buffer.alloc(8);
    const body = Buffer.from(chunk);
    buffer.writeInt32BE(this.sequenceNumber++);
    buffer.writeInt32BE(body.length, this.bodyLen);

    return Buffer.concat([buffer, body]);
  }
  decode(chunk) {
    const seq = chunk.readInt32BE(0);
    const bodyLen = chunk.readInt32BE(this.bodyLen);
    const body = chunk.slice(this.headerLen).toString();
    return { seq, bodyLen, body };
  }
  getPackageLen(chunk) {
    if (chunk.length < this.headerLen) {
      return 0;
    } else {
      return this.headerLen + chunk.readInt32BE(this.bodyLen);
    }
  }
}

module.exports = MyTransform;
