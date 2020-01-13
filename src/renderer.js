var fs = require('fs');
var mjml = require('mjml');
var ssr = require('vue-server-renderer');
var vue = require('vue');

module.exports = {
    renderLetter: (temp, serv, data) => {
        return new Promise((resolve, reject) => {
            var path = `./templates/${temp}.mjml`;
            var template = '';
            var servPath = `./templates/${serv ? serv : 'base'}.mjml`;
            var layout = '';

            if (fs.existsSync(path)) {
                template = fs.readFileSync(path, 'utf-8');
            } else {
                reject(new Error(`Template with this name does not exists: ${path}`));
            }

            if (fs.existsSync(servPath)) {
                layout = fs.readFileSync(servPath, 'utf-8');
            } else {
                reject(new Error(`Template with this name does not exists: ${servPath}`))
            }

            try {
                vue.component('Content', {
                    template: template,
                    data: function () {
                        return data;
                    }
                });

                var app = new vue({
                    template: layout
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
            } catch (err) {
                reject(err);
            }
        });
    }
}