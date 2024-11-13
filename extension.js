const vscode = require('vscode');
// const fs = require('fs');
const WebviewProvider = require('./src/WebviewProvider');

function activate(context) {
    // Register the command to open and preview `.stflow` files
    const disposable = vscode.commands.registerCommand('text2chart.previewFlowChart', async (uri) => {
        let content = "", title = 'Flow Chart: ';

        console.log('Command triggered with URI:', uri);
        if (uri && uri.path.endsWith('.stflow')) { // When command is selected from context menu
            vscode.window.showInformationMessage(uri);
            const document = await vscode.workspace.openTextDocument(uri);

            content = document.getText();
            title += extractFileName(uri.path);
        } else { // When command is selected from Command Palette
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'stflow') {
                content = editor.document.getText();
                title += extractFileName(editor.document.fileName);
            } else {
                vscode.window.showErrorMessage('Please select a valid .stflow file to preview.');
            }
        }
        const webviewProvider = new WebviewProvider(context);
        webviewProvider.createWebviewPanel(content, title);
    });

    context.subscriptions.push(disposable);
}

function extractFileName(p){
    const tP = p.split("/");
    return tP[tP.length -1]
}


function deactivate() {}

module.exports = {
    activate,
    deactivate
};
