
module.exports = {
    options: {
        separator: ';\n'
    },
    dist: {
        files: {
            'bin/flexible.js':['js/flexible.debug.js','js/flexible_css.debug.js','js/base/picscale.js'],
			'bin/model.js':['model/*.js','viewModel/*.js','js/base/config.js'],
			'bin/gg.js':['js/base/util.js','js/base/core.js','js/base/imgPoll.js'],
            'bin/islider.js':['js/islider.js','js/ext/*.js','js/plugins/*.js']
        }
    }
};