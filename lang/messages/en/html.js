// ./lang/messages/en/html.js

class HTMLText {
    constructor() {
        this.header = `
        <head>
            <title>Lab 2</title>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>
        `;

        this.usage = `
        <body>
            <h1 style="padding: 15px;">Usage:</h1>
            <ul>
                <li>/getDate?name=[your_name] - Get current date and time with a personalized message.</li>
                <li>/readFile?file=[file_name] - Read content from a file.</li>
                <li>/writeFile?file=[file_name]&text=[text] - Write content to a file.</li>
            </ul>
        </body>
        `;
        
        this.successWrite = `
        <body>
            <h1 style="padding: 15px; color: green;">Successfully wrote to %1</h1>
        </body>
        `;

        this.failWrite = `
        <body>
            <h1 style="padding: 15px; color: red;">Error: No text provided to write to file.</h1>
        </body>
        `;

        this.successRead = `
            <body>
                <div style="padding: 20px;">
                    <p>
                        %1
                    </p>
                </div>
            </body>
        `;

        this.failRead = `
            <body>
                <h1 style="padding: 15px; color: red;">Error: Could not read the file: %1</h1>
            </body>
        `;

        this.getDateMessage = `
        <body>
            <h1 style="padding: 15px; color: blue;">%1</h1>
        </body>
        `;
    }
}

module.exports = HTMLText;
