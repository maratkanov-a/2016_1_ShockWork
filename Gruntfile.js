module.exports = function (grunt) {

    grunt.initConfig({

    //add less

        less: {
              development: {
                options: {
                  paths: ['less'],
                  plugins: [
                    new(require('less-plugin-autoprefix'))({
                      browsers: ["last 2 versions"]
                    })
                  ],
                },
                files: {
                  'public_html/css/main.css': 'less/main.less'
                }
              }
            },

        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'node server'
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
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
                options: {
                    livereload: true
                }
            }



        },
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('less', ['less']);

};