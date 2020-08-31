"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useVerifyCode = function (start, options) {
    var _a;
    var interval = (_a = options === null || options === void 0 ? void 0 : options.interval) !== null && _a !== void 0 ? _a : 1000;
    var begin = start !== null && start !== void 0 ? start : 60;
    var _b = react_1.useState(begin), count = _b[0], setCount = _b[1];
    var _c = react_1.useState(0), end = _c[0], setEnd = _c[1];
    var _d = react_1.useState(false), status = _d[0], setStatus = _d[1];
    var timerRef = react_1.useRef();
    var intervalCaller = function () {
        timerRef.current = setInterval(function () {
            if (count - 1 === end) {
                clearInterval(timerRef.current);
                return setStatus(false);
            }
            setCount(count - 1);
        }, interval);
    };
    var setTarget = react_1.useCallback(function (end) {
        if (end === void 0) { end = 0; }
        setStatus(true);
        setEnd(end);
    }, []);
    react_1.useEffect(function () {
        status ? intervalCaller() : setCount(begin);
        return function () { return clearInterval(timerRef.current); };
    }, [count, status]);
    return { current: count, setTarget: setTarget, status: status };
};
exports.default = useVerifyCode;
