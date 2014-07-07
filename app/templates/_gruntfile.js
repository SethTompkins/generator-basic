module.exports = function(grunt) {
    // Make project configuration changes here
    var projectConfig = {
        banner:
            '/*!\n' +
            ' * Title:    <%= pkg.name %>\n' +
            ' * Author:   <%= pkg.author.name %>\n' +
            ' *           <%= pkg.author.email %>\n' +
            ' * Creation: <%= pkg.creation %>\n' +
            ' */',
        browsers: 'last 4 versions',
        dev: {
            dir: 'dev',
            sass: 'dev/scss',
            css: 'dev/css',
            images: 'dev/img',
            javascript: 'dev/js',
            components: 'dev/components'
        },
        build: {
            dir: 'build',
            sass: 'build/scss',
            css: 'build/css',
            images: 'build/img',
            javascript: 'build/js',
            components: 'build/components'
        },
        server_port: 9000,
        server_base: 'dev'
    };

    grunt.initConfig({
        // Task configuration
        pkg: grunt.file.readJSON('package.json'),
        projectConfig: projectConfig,
        sass: {
            dev: {
                options: {
                    sourcemap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.sass %>',
                    src: ['**.scss'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    banner: '<%= projectConfig.banner %>',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.sass %>',
                    src: ['**.scss'],
                    dest: '<%= projectConfig.build.css %>',
                    ext: '.css'
                }]
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['<%= projectConfig.browsers %>']
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.css %>',
                    src: ['**.css'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    browsers: ['<%= projectConfig.browsers %>']
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.css %>',
                    src: ['**.css'],
                    dest: '<%= projectConfig.build.css %>',
                    ext: '.css'
                }]
            }
        },
        csscomb: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.css %>',
                    src: ['**.css'],
                    dest: '<%= projectConfig.dev.css %>',
                    ext: '.css'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.css %>',
                    src: ['**.css'],
                    dest: '<%= projectConfig.build.css %>',
                    ext: '.css'
                }]
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 1
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.images %>',
                    src: '**.{png,jpg,gif}',
                    dest: '<%= projectConfig.build.images %>'
                }]
            }
        },
        clean: ['<%= projectConfig.build.dir %>'],
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.dev.dir %>',
                    src: ['**'],
                    dest: '<%= projectConfig.build.dir %>'
                }]
            }
        },
        compress: {
            build: {
                options: {
                    archive: '<%= projectConfig.build.images %>/images.zip',
                    mode: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= projectConfig.build.images %>',
                    src: ['**.{jpg,png,gif}']
                }]
            }
        },
        connect: {
            options: {
                port: '<%= projectConfig.server_port %>',
                base: '<%= projectConfig.server_base %>',
                livereload: true
            },
            open: true
        },
        watch: {
            html: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.dir %>/**.html']
            },
            sass: {
                files: ['<%= projectConfig.dev.sass %>/**'],
                tasks: ['sass:dev', 'csscomb:dev', 'autoprefixer:dev']
            },
            css: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.css %>/**.css']
            },
            images: {
                options: { livereload: true },
                files: ['<%= projectConfig.dev.images %>/**']
            },
            components: {
                files: ['<%= projectConfig.dev.components %>/**']
            }
        }
    });

    // Automagically load all Grunt NPM tasks
    require("load-grunt-tasks")(grunt);

    // Register task groups
    grunt.registerTask('default', [
        'sass:dev',
        'csscomb:dev',
        'autoprefixer:dev'
    ]);
    grunt.registerTask('server', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('build', [
        'clean',
        'copy:build',
        'sass:build',
        'csscomb:build',
        'autoprefixer:build',
        'imagemin',
        'compress'
    ]);

};
