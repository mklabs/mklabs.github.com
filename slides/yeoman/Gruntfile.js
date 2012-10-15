module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      markdown: {
        files: '*.md',
        tasks: 'generate-prez reload'
      },

      htmlAndStuff: {
        files: ['*.html', '*.js'],
        tasks: 'reload'
      }
    }
  });

  grunt.registerTask('generate-prez', 'HTML presentation generation thingy', function() {
    console.log('regenerate');
    var generate = grunt.util.spawn({
      cmd: 'sh',
      args: ['generate']
    }, this.async());

    generate.stdout.pipe(process.stdout);
    generate.stderr.pipe(process.stderr);
  });

};
