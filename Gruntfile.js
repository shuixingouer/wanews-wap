module.exports = function(grunt) {
    require('load-grunt-config')(grunt);
    grunt.registerTask('cu', ['concat','uglify']);
    grunt.registerTask('initLess',['less','cssmin']);
};