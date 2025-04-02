"use strict";
//shift + alt + f
figma.showUI(__html__);
figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-shapes') {
        const numberOfRectangles = msg.count;
        const nodes = [];
        for (let i = 0; i < numberOfRectangles; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
    if (msg.type === 'copy-code') {
        const selection = figma.currentPage.selection;
        if (selection.length === 0) {
            figma.notify("Please select a frame.");
            return;
        }
        const node = selection[0];
        if (node.type !== "FRAME") {
            figma.notify("Selected node is not a frame.");
            return;
        }
        const frame = node;
        const frameCode = frame;
        figma.ui.postMessage({ type: 'display-copy-code', code: frameCode });
    }
};
