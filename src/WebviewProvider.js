// File: src/WebviewProvider.js
const vscode = require('vscode');

class WebviewProvider {
    constructor(context) {
        this.context = context;
    }

    createWebviewPanel(content, title) {
        const panel = vscode.window.createWebviewPanel(
            'flowChartPreview',
            title,
            vscode.ViewColumn.One,
            { enableScripts: true, localResourceRoots: [this.context.extensionUri] }
        );

        const cssPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'bundle.css');
        const jsPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'text2chart.min.js');
    
        const cssUri = panel.webview.asWebviewUri(cssPath);
        const jsUri = panel.webview.asWebviewUri(jsPath);

        panel.webview.html = this.getWebviewContent(content, jsUri, cssUri);
    }

    getWebviewContent(content, jsUri, cssUri) {
        
        const serializedContent = JSON.stringify(content);
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Flow Chart Preview</title>
                <link rel="stylesheet" href="${cssUri}">
            </head>
            <body>
                <div id="app" style="width:100vw; height:100vh;" ></div>
                
                <!-- Load Text2Chart library -->
                <script src="${jsUri}"></script>
                <script>
                    // Initialize the FlowChart with raw text content
                    document.addEventListener("DOMContentLoaded", function() {
                        new Text2Chart.FlowChart({
                            target: document.getElementById("app"),
                            props: {
                                text: ${serializedContent}
                            }
                        });
                    });
                </script>
            </body>
            </html>
        `;
    }
}

module.exports = WebviewProvider;
