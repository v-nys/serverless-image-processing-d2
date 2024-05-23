'use strict'
const expect = require('chai').expect // require syntax vereist iets oudere versie
const handler = require('./handler');

describe('Image processing', async function() {
    it('applies greyscale to the 2-pixel image', async function() {
        const mockEvent = {
            body: "iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAIAAAB7QOjdAAAAD0lEQVR42mP6z8DA/l8YAAg1AhvhYAP3AAAAAElFTkSuQmCC",
            headers: {
                authorization: "Bearer wachtwoordtijdenstests"
            }
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
        expect(mockContext.data).to.equal("iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAEUlEQVR4AWM0MzP739zczAAADhYDLCgAyDMAAAAASUVORK5CYII=");
    });
});
