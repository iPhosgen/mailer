var fs = require('fs');
var mjml = require('mjml');
var ssr = require('vue-server-renderer');
var vue = require('vue');

module.exports = {
    renderLetter: (temp, data) => {
        return new Promise((resolve, reject) => {
            var path = `./templates/${temp}.mjml`;

            if (fs.existsSync(path)) {
                var template = fs.readFileSync(path, 'utf-8');
                var app = new vue({
                    template: template,
                    data: function () {
                        return data;
                    }
                });

                ssr.createRenderer().renderToString(app, (err, renderer) => {
                    if (err) {
                        reject(new Error(`VueJS compiler error. ${err}`));
                    }

                    var letter = mjml(renderer);

                    if (letter.html) {
                        resolve(letter.html);
                    }
                });
            } else {
                reject(new Error(`Template with this name does not exist: ${path}`));
            }
        });
    }
}