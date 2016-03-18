'use strict';

var galaxyService = require('../helpers/galaxyService');

module.exports = {
 performSearch: performSearch
};

function performSearch(req, res) {

    var freeFormAddress = req.swagger.params.freeFormAddress.value || 'PETALING JAYA';
    var limit = req.swagger.params.limit.value || 5;
    var hello = galaxyService.performSearch(freeFormAddress, limit);
    console.log("hello:", hello);
 res.json(hello || "hello");
}
