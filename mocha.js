describe('', () => {
	before(function () {
		// runs once before the first test in this block
	});

	after(function () {
		// runs once after the last test in this block
	});

	beforeEach(function () {
		// runs before each test in this block
	});

	afterEach(function () {
		// runs after each test in this block
	});

    describe.only('', function () {
        // only this block of tests will be run
        it('', function () {
            
        });
    });

    it.only('', function () {
        // only this test will be run
    });

    it.only('', () => {
        // should set the timeout of this test to 1000 ms; instead will fail
        this.timeout(1000);
    });

});