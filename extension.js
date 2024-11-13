const vscode = require('vscode');
// const fs = require('fs');
const WebviewProvider = require('./src/WebviewProvider');
let view = null; 

function activate(context) {
    // Register the command to open and preview `.stflow` files
    const disposable = vscode.commands.registerCommand('text2chart.previewFlowChart', async (uri) => {
        let content = "", title = 'Flow Chart: ';
        let filePath = "";

        // console.log('Command triggered with URI:', uri);
        if (uri && uri.path.endsWith('.stflow')) { // When command is selected from context menu
            const document = await vscode.workspace.openTextDocument(uri);

            content = document.getText();
            title += extractFileName(uri.path);
            filePath = uri.path;
        } else { // When command is selected from Command Palette
            const editor = vscode.window.activeTextEditor;
            filePath = editor.document.fileName;
            if (editor && editor.document.languageId === 'stflow') {
                content = editor.document.getText();
                title += extractFileName(editor.document.fileName);
            } else {
                vscode.window.showErrorMessage('Please select a valid .stflow file to preview.');
            }
        }
        if(!view) view = new WebviewProvider(context);
        view.createWebviewPanel(content, title, filePath);
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
