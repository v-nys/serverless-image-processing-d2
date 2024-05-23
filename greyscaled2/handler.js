'use strict'

const jimp = require("jimp");
const { readFile } = require('fs').promises;

module.exports = async (event, context) => {
  const auth_header = event.headers.authorization;
  if (auth_header && auth_header.startsWith("Bearer ")) {
    const token = auth_header.substring(7);

    let expected_secret;
    if (process.env.NODE_ENV === "test") {
      expected_secret = "wachtwoordtijdenstests"
    }
    else if (process.env.NODE_ENV === "production") {
      expected_secret = await readFile("/var/openfaas/secrets/d2token");
    }
    else {
      console.log("Belangrijke omgevingsvariabele ontbreekt");
      process.exit(1);
    }

    if (token === expected_secret) {
      const base64Input = event.body;
      const bufferInput = Buffer.from(base64Input, "base64");
      const jimpValue = await jimp.read(bufferInput);
      const outputBuffer = await jimpValue.greyscale().getBufferAsync(jimp.MIME_PNG);
      return context
        .status(200)
        .succeed(outputBuffer.toString('base64'))
    }
  }
}