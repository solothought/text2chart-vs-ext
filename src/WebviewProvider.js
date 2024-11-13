// File: src/WebviewProvider.js
const vscode = require('vscode');


class WebviewProvider {
    constructor(context) {
        this.context = context;
        this.panel = null;
        this.cssUri = null;
        this.jsUri = null;
        
        console.log("Created view")
    }

    updateMediaPath(){
        const cssPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'bundle.css');
        const jsPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'text2chart.min.js');
        this.cssUri = this.panel.webview.asWebviewUri(cssPath);
        this.jsUri = this.panel.webview.asWebviewUri(jsPath);
    }

    createWebviewPanel(content, title, filePath) {
        if(this.panel){
            this.panel.reveal(vscode.ViewColumn.One);
        }else{
            this.panel = vscode.window.createWebviewPanel(
                'flowChartPreview',
                title,
                vscode.ViewColumn.One,
                { enableScripts: true, localResourceRoots: [this.context.extensionUri] }
            );

            this.updateMediaPath();

            this.listenForContentChanges(filePath, this.jsUri, this.cssUri)
            this.panel.webview.html = this.getWebviewContent(content, this.jsUri, this.cssUri);

            this.panel.onDidDispose(() => {
                this.panel = null;
            });
        }
    }

    listenForContentChanges(filePath, jsUri, cssUri){
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.uri.path === filePath) {
                // Update the Webview with the latest content
                const updatedContent = event.document.getText();
                this.panel.webview.html = this.getWebviewContent(updatedContent, jsUri, cssUri);
            }
        });
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
                <div id="app" ></div>
                
                <!-- Load Text2Chart library -->
                <script src="${jsUri}"></script>
                <script>
                    // Initialize the FlowChart with raw text content
                    document.addEventListener("DOMContentLoaded", function() {
                        new Text2Chart.FlowChart({
                            target: document.getElementById("app"),
                            props: {
                                text: ${serializedContent},
                                style: "width: 100vw; height: 100vh;"
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
