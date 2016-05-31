module.exports = function(grunt) {

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
                    'public_html/css/main.css': 'less/main.less',
                    'public_html/css/cards/template.css': 'less/less_for_template/main.less'
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
                    template: function(data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });', {
                                data: data
                            }
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
        },
        requirejs: {
            build: {
                options: {
                    almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/config.js",
                    name: "main",
                    optimize: "none",
                    out: "public_html/js/build/main.js",
                    include: ['main'],
                    insertRequire: ["main"]
                }
            }
        },
        concat: {
            build: {
                separator: ';\n',
                src: [
                    'public_html/js/lib/almond.js',
                    'public_html/js/build/main.js',
                ],
                dest: 'public_html/js/build.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'public_html/js/build.min.js': ['public_html/js/build.js']
                }
            }
        },
        concat_css: {
            build: {
                files: {
                    'public_html/css/build.css': [
                        'public_html/css/loader.css',
                        'public_html/css/materialize.min.css',
                        'public_html/css/material-icon.css',
                        'public_html/css/sweetalert.css',
                        'public_html/css/main.css',
                        'public_html/css/jquery-ui.css',
                        'public_html/css/style.css',
                        'public_html/css/template.css'
                    ],
                }
            }
        },
        cssmin: {
            target: {
                options: {
                    keepSpecialComments: 0
                },
                files: [{
                    expand: true,
                    cwd: 'public_html/css',
                    src: ['build.css'],
                    dest: 'public_html/css',
                    ext: '.min.css'
                }]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('less', ['less']);
    grunt.registerTask('build', ['fest', 'requirejs:build', 'concat:build', 'uglify:build', 'concat_css:build', 'cssmin']);
};