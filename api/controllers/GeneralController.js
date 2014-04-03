/**
 * GeneralController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    angular: function (req, res) {
        res.view('angular');
//        var fragment = req.query._escaped_fragment_;
////        res.json(fragment);
//        // If there is no fragment in the query params
//        // then we're not serving a crawler
//        if (!fragment) {
////            res.json('xxx');
//            res.view('angular');
//        } else {
//            res.json(fragment);
//        }
//        ;
//
//        // If the fragment is empty, serve the
//        // index page
//        if (fragment === "" || fragment === "/")
//            fragment = "/index.html";
//
//        // If fragment does not start with '/'
//        // prepend it to our fragment
//        if (fragment.charAt(0) !== "/")
//            fragment = '/' + fragment;
//
//        // If fragment does not end with '.html'
//        // append it to the fragment
//        if (fragment.indexOf('.html') == -1)
//            fragment += ".html";
//
//        // Serve the static html snapshot
//        try {
//            var file = __dirname + "/snapshots" + fragment;
//            res.json('snapshot');
////            res.sendfile(file);
//        } catch (err) {
//            res.json('snapshot');
////            res.send(404);
//        }

    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to GeneralController)
     */
    _config: {}


};
