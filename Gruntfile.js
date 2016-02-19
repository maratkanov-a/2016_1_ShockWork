module.exports = function (grunt) {

    grunt.initConfig({

		shell: {
            dev: {
                command: 'node server.js'
            }
		},

		watch: {
             files: ['templates/*.xml'],
             tasks: ['fest']
		},
		
		concurrent: {
            target: {
                tasks: ['shell:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
		},

		fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
        },
        qunit: {
                all: ['./public_html/tests/index.html']
            }
        }
    });

	// подключть все необходимые модули
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');

    // результат команды grunt
    grunt.registerTask('default', ['concurrent:target']);
    grunt.registerTask('test', ['qunit:all']);

};
