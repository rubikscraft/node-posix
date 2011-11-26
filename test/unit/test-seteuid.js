var assert = require('assert'),
    posix = require("../../lib/posix");

assert.throws(function () {
    posix.seteuid();
}, /exactly 1 argument/);

assert.throws(function () {
    posix.seteuid(123, 456);
}, /exactly 1 argument/);

assert.throws(function () {
    posix.seteuid("dummyzzz1234");
}, /user id does not exist|ENOENT/);

function test_seteuid() {
    var old = posix.geteuid();
    assert.equal(old, 0);

    posix.seteuid("root");
    assert.equal(posix.geteuid(), 0);

    posix.seteuid(0);
    assert.equal(posix.geteuid(), 0);

    posix.seteuid(123);
    assert.equal(posix.geteuid(), 123);

    posix.seteuid(0);
    assert.equal(posix.geteuid(), 0);
}

if(process.getuid() == 0) {
    test_seteuid()
}
else {
    console.log("warning: seteuid tests skipped - not a privileged user!");
}