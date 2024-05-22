'use strict'
const expect = require('chai').expect // require syntax vereist iets oudere versie
const handler = require('./handler');

describe('Image processing', async function() {
    it('returns the input as output', async function() {
        const mockEvent = {
            body: "ABCD"
        };
        const mockContext = {
            status: function(code) {
                return this;
            },
            succeed: function(data) {
                this.data = data;
            }
        }
        await handler(mockEvent, mockContext);
        expect(mockContext.data).to.equal("ABCD");
    });
});
