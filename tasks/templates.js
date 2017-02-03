

var path = require('path');

var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

gulp.task('templates', function () {

    var partials = gulp.src(['src/templates/**/_*.hbs'])
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }));

    var templates = gulp.src('src/templates/**/[^_]*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            root: 'e',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('src\\templates\\', ''));
            }
        }));

    return merge(templates, partials)
        .pipe(concat('templates.js'))
        .pipe(wrap('import Handlebars from \'handlebars\';\nvar e = {};\n<%= contents %>\nexport default e;'))
        .pipe(gulp.dest('src/'));
});
