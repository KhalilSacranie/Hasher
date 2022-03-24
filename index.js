const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const hash = async (content) => {
    const salt = randomBytes(16).toString('hex');
    const hashedContent = scryptSync(content, salt, 64).toString('hex');    
    const hashedContentWSalt = `${salt}:${hashedContent}`;
    return hashedContentWSalt;
};

const match = async (content, key) => {
    content = (await content).toString('hex');
    const [salt, hashedContent] = content.split(':');
    const contentBuffer = Buffer.from(hashedContent, 'hex');
    const keyBuffer = scryptSync(key, salt, 64);
    const match = timingSafeEqual(keyBuffer, contentBuffer);
    return match;
}

module.exports = { hash, match };
