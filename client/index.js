/*
  * Client application for creating and sending a sign request to the Identity Registrar.
  * This is require for proof of Identity on the universal web.
  * An Identity Certificate allows users to access the Domain Information Service.
  * Identities are unique and can't be duplicated.
  * Master Certificates are used for requesting ephemeral certificates and signing them.
  * The Master certificate is provided with the ephemeral certificate to prove authenticity.
  * Encryption is done by the ephemeral certificate.
  * Ephemeral certificates also act as a form of identification and as a passwordless login.
*/
module.exports = async () => {
  console.log('-------CLIENT INITIALIZING-------\n');
  const state = {
    type: 'client',
    server: require('dgram').createSocket('udp4'),
    utility: require('Lucy'),
    stringify: require('json-stable-stringify')
  };
  await require('../console')(state);
  await require('../crypto')(state);
  await require('../pluckBuffer')(state);
  await require('./configuration')(state);
  await require('./status')(state);
  await require('../file')(state);
  await require('../certificate')(state);
  await require('./coreCertificates')(state);
  await require('./profiles')(state);
  state.initiate = async () => {
    await require('./send')(state);
    await require('./onMessage')(state);
    await require('./listening')(state);
    await require('./api')(state);
  };
  console.log('-------CLIENT INITIALIZED-------\n');
  return state;
};
