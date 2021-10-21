const big = require('big.js')

// Configure Big to never show exponential notation.
big.NE = -31;
big.PE = 39;

const RAW_IN_MEGA = new big('1000000000000000000000000000000');
const MEGA_IN_RAW = new big('0.000000000000000000000000000001');
const MEGA_MIN_AMOUNT = MEGA_IN_RAW;
const RAW_MAX_AMOUNT = new big('340282366920938463463374607431768211455');
const MEGA_MAX_AMOUNT = new big(RAW_MAX_AMOUNT).times(MEGA_IN_RAW);

module.exports = {

    fromRaw(raw) {
        let rawBig;
        try {
            rawBig = new big(raw);
        } catch (error) {
            throw new Error('The raw amount is invalid.');
        }
        return rawBig.mul(MEGA_IN_RAW).toString();
    },
    
    toRaw(mega) {
        
        if (mega === undefined) return new Error("First parameter, NANO amount is missing.")

        if (!parseFloat(mega)) return new Error("First parameter, NANO amount must be a Number.")

        mega = parseFloat(mega)

        let megaBig = big;

        try {

            megaBig = new big(mega);

            if (megaBig.lt(0)) return new Error("First parameter, NANO amount must not be negative.")
            if (megaBig.lt(MEGA_MIN_AMOUNT)) return new Error("First parameter, NANO amount is too small.")
            if (megaBig.gt(MEGA_MAX_AMOUNT)) return new Error("First parameter, NANO amount is too large.")

            return megaBig.times(RAW_IN_MEGA).toString();

        } catch (error) {
            return new Error('The mega amount is invalid.');
        }
    },

}