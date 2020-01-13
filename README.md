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

2. Check MJML [official documentation](https://mjml.io/documentation/), build your own template and put it in or modify existing `test.mjml` temlate

    ```xml
    <mj-wrapper>
        <mj-section>
            <mj-column width="100%">
            <mj-text>{{greeting}}</mj-text>
            </mj-column>
        </mj-section>
    </mj-wrapper>
    ```

3. Also you can use template inheritance for apply one root template to different content templates, so change `base.mjml` or create your own. After adding custom root template you need to pass its name as a query parameter `service` for example: `http://localhost:3000/render?template=test&service=my-base`

4. Add data to your template using the VUeJS ["Mustache" syntax](https://vuejs.org/v2/guide/syntax.html)

    ```xml
    <mj-text>{{myText}}</mj-text>
    ```

5. Also you can use [Conditional Rendering](https://vuejs.org/v2/guide/conditional.html) and [List Rendering](https://vuejs.org/v2/guide/list.html):

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

6. Call `/render` method with POST request and passing template name to query and template data to payload (all data that you send in payload may be available in template)

    ```shell
    curl -X POST -H "Content-Type: application/json" \
    -d '{"myText":"This is my first email"}' \
    https://localhost:3000/render?template=my_template
    ```

7. Enjoy your beautiful email letter html that compatible with most email clients

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FiPhosgen%2Fmailer.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FiPhosgen%2Fmailer?ref=badge_large)