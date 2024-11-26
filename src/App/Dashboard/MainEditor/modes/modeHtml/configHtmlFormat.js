import MoodIcon from '@mui/icons-material/Mood';

import { lazyLoadPrettierAndParserHtml } from '../../../../../utils/lazyLoadLibraries/lazyLoadLibraries.js';

const configHtmlFormat = {
    operationId: 'htmlFormat',

    label: 'Format HTML',
    icon: MoodIcon,

    snippets: [{
        content: [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '    <title>Sample HTML</title>',
            '  <meta charset="utf-8">',
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '    <link href="styles.css" rel="stylesheet">',
            '</head>',
            '<body>',
            '<header>',
            '<h1>Welcome to my website</h1>',
            '<nav>',
            '<ul>',
            '<li><a href="#about">About</a></li>',
            '<li><a href="#services">Services</a></li>',
            '<li><a href="#contact">Contact</a></li>',
            '</ul>',
            '</nav>',
            '</header>',
            '<main>',
            '<section id="about">',
            '<h2>About Us</h2>',
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet neque ac turpis posuere, quis pharetra lacus sagittis. Integer convallis vel est ac bibendum. Sed laoreet leo eget luctus ultricies.</p>',
            '</section>',
            '<section id="services">',
            '<h2>Our Services</h2>',
            '<ul>',
            '<li>Service 1</li>',
            '<li>Service 2</li>',
            '<li>Service 3</li>',
            '</ul>',
            '</section>',
            '<section id="contact">',
            '<h2>Contact Us</h2>',
            '<form>',
            '<label for="name">Name:</label>',
            '<input type="text" id="name" name="name"><br>',
            '<label for="email">Email:</label>',
            '<input type="email" id="email" name="email"><br>',
            '<label for="message">Message:</label>',
            '<textarea id="message" name="message"></textarea><br>',
            '<button type="submit">Send</button>',
            '</form>',
            '</section>',
            '</main>',
            '<footer>',
            '<p>&copy; MyWebsite.com. All rights reserved.</p>',
            '</footer>',
            '</body>',
            '</html>'
        ].join('\n')
    }],

    performOperation: async ({ inputText }) => {
        const { prettier, parserHtml } = await lazyLoadPrettierAndParserHtml();
        const options = {
            parser: 'html',

            // Use spaces instead of tabs
            tabWidth: 4,

            plugins: [parserHtml]
        };
        const output = await prettier.format(inputText, options);
        return [null, output];
    }
};

export { configHtmlFormat };
