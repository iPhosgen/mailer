# Mailer

This is a simple NodeJS service for rendering beautiful responsive email letters from temlate. You can use all power of VueJS dinamic HTML templates, server-side rendering and MJML layout for building HTML letters that compatible with most email clients.

Run it as a microservise and enoy your new great email letters.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FiPhosgen%2Fmailer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FiPhosgen%2Fmailer?ref=badge_shield)

## Installation

0. Check that node and npm are exists

    ```shell
    node --version
    npm version
    ```

1. Clone this repository

    ```shell
    cd /opt
    git clone https://github.com/iPhosgen/mailer.git
    cd mailer
    ```

2. Install all packages

    ```shell
    npm install
    ```

3. Set up systemd unit

    ```shell
    cp etc/mailer.service /etc/systemd/system
    systemctl enable mailer.service
    systemctl start mailer.service
    ```

## Basic usage

1. Create new email template

    ```shell
    nano /opt/mailer/templates/my_template.mjml
    ```

2. Check MJML [official documentation](https://mjml.io/documentation/), build your own template and put it in or modify existing `base.mjml` temlate

    ```xml
    <mjml>
        <mj-body>
            ...
        </mj-body>
    </mjml>
    ```

3. Add data to your template using the VUeJS [“Mustache” syntax](https://vuejs.org/v2/guide/syntax.html)

    ```xml
    <mj-text>{{myText}}</mj-text>
    ```

4. Also you can use Conditional Rendering and List Rendering:

    ```xml
    <mj-section v-if="showSection">
        <mj-table>
            <tr v-for="row in table">
                <td>{{row.id}}</td>
            </tr>
            <tr v-for="row in table">
                <td>{{row.date}}</td>
            </tr>
            <tr v-for="row in table">
                <td>{{row.message}}</td>
            </tr>
        </mj-table>
    </mj-section>
    ```

5. Call `/render` method with POST request and passing template name to query and template data to payload (all data that you send in payload may be available in template)

    ```shell
    curl -X POST -H "Content-Type: application/json" \
    -d '{"myText":"This is my first email"}' \
    https://localhost:3000/render?template=my_template
    ```

6. Enjoy your beautiful email letter html that compatible with most email clients

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FiPhosgen%2Fmailer.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FiPhosgen%2Fmailer?ref=badge_large)