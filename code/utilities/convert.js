const Big = require('big.js');

// Configure Big to never show exponential notation.
Big.NE = -31;
Big.PE = 39;

const RAW_IN_MEGA = new Big('1000000000000000000000000000000');
// const MEGA_IN_RAW = new big('0.000000000000000000000000000001'); // old
const MEGA_MIN_AMOUNT = new Big('1').div(RAW_IN_MEGA);
// const RAW_MAX_AMOUNT = new big('340282366920938463463374607431768211455');
const RAW_MAX_AMOUNT = new Big('133248298000000000000000000000000000000'); // max NANO supply

const MEGA_MAX_AMOUNT = new Big(RAW_MAX_AMOUNT).div(RAW_IN_MEGA);

module.exports = {

  fromRaw(raw) {
    if (raw === undefined) return new Error('First parameter, raw amount is missing.');
    if (!parseInt(raw)) return new Error('First parameter, raw amount must be a whole number.');

    let rawBig;

    try {
      rawBig = new Big(raw);

      if (rawBig.lt(0)) return new Error('First parameter, raw amount must not be negative.');
      if (rawBig.gt(RAW_MAX_AMOUNT)) return new Error('First parameter, raw amount is too large.');

      return rawBig.div(RAW_IN_MEGA).toString();
    } catch (error) {
      throw new Error('The raw amount is invalid.');
    }
  },

  toRaw(mega) {
    if (mega === undefined) return new Error('First parameter, NANO amount is missing.');
    if (!parseFloat(mega)) return new Error('First parameter, NANO amount must be a number.');

    mega = parseFloat(mega);

    let megaBig = Big;

    try {
      megaBig = new Big(mega);

      if (megaBig.lt(0)) return new Error('First parameter, NANO amount must not be negative.');
      if (megaBig.lt(MEGA_MIN_AMOUNT)) return new Error('First parameter, NANO amount is too small.');
      if (megaBig.gt(MEGA_MAX_AMOUNT)) return new Error('First parameter, NANO amount is too large.');

      return megaBig.times(RAW_IN_MEGA).toString();
    } catch (error) {
      return new Error('The NANO amount is invalid.');
    }
  },

};
