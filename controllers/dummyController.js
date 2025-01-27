const _context = require('../DAL/communicado');

exports.createDummy = async (req, res) => {
    try {

        await _context.createDummy(req);
        res.status(200).json({ Message: 'created successfully' });

    } catch (err) {

        const errorMessage = err && err.Message ? err.Message : err.message ?? "Internal server error";

        if (errorMessage.includes("Internal server error")) {
            return res.status(500).json({
                Message: "Internal server error",
                Completed: false
            });
        }

        else {
            return res.status(400).json({
                Message: errorMessage,
                Completed: false
            });
        }
    }
}