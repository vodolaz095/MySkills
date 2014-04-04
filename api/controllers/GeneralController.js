module.exports = {
    angular: function (req, res, next) {
        if (req.query._escaped_fragment_)
        {
            //res.redirect('http://api.seo4ajax.com/53be25f061015577115854093f7ec5a9/?_escaped_fragment_=' + req.query._escaped_fragment_);
//            res.redirect('/snapshots' + req.query._escaped_fragment_);
            res.redirect('http://api.seo4ajax.com/53be25f061015577115854093f7ec5a9' + req.query._escaped_fragment_);
        }else{
            res.view('angular');
        }

    },
    snapshots:function(req,res,next){
        res.send(req.headers['user-agent']);
        //res.send(req.param('fragment'));
        //res.redirect('http://api.seo4ajax.com/53be25f061015577115854093f7ec5a9/' + req.param('fragment'));
    }
};
