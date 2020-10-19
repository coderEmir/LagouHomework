const cwd = process.cwd()
const loadGruntTasks = require('load-grunt-tasks')

const sass = require('sass')

module.exports = grunt => {
    grunt.initConfig({ 
        
        clean: ['.tmp/**', 'release/**'],
        sass:{
            options: {
                implementation: sass
            },
            main: {
                files: {
                    "dist/css/main.css": "src/assets/styles/main.scss"
                }
            },
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ["@babel/preset-env"]
            },
            main: {
                files: {
                    "dist/js/app.js": "src/assets/scripts/main.js"
                }
            }
        },
        watch: {
            js: {
                files: ["src/js/*.js"],
                tasks: ["babel"],
            },
            css: {
                files: ["src/assets/styles/main.scss"],
                tasks: ["sass"]
            },
        }
    })
   loadGruntTasks(grunt)
   grunt.registerTask('default', ['sass', 'babel', 'watch'])
}