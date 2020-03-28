function resizableVerticalPanel(panelElement, side) {
    const resizableGrabRange = 4;
    const resizableMinWidth = 10;
    const panelSide = side || 'left';
    let widthCalculatingMethod;
    let regionDetectingMethod;
    let dragging = false;
    let changedCursor = false;



    if (panelSide === 'right') {
        widthCalculatingMethod = getRightPanelWidth;
        regionDetectingMethod = inDragRegionForRightPanel;
    } else {
        widthCalculatingMethod = getLeftPanelWidth;
        regionDetectingMethod = inDragRegionForLeftPanel;
    }
    document.addEventListener('mousemove', mouseMoveG, true);
    document.addEventListener('mouseup', mouseUpG, true);
    document.addEventListener('mousedown', mouseDown, true);


    function mouseDown(evt) {
        if (regionDetectingMethod(evt)) {
            dragging = true;
            evt.stopPropagation();
        }
    }

    function mouseMoveG(evt) {
        if (dragging || regionDetectingMethod(evt)) {
            document.body.style.cursor = 'ew-resize';
            changedCursor = true;
        } else {
            if (changedCursor) {
                document.body.style.cursor = 'default';
                changedCursor = false;
            }
        }
        if (dragging) {
            setNewWidth(widthCalculatingMethod(evt.clientX));
            evt.stopPropagation();
            evt.preventDefault();
        }
    }

    function mouseUpG(evt) {
        if (!dragging) {
            return;
        }
        panelElement.style.cursor = 'default';
        dragging = false;
        evt.stopPropagation();
        evt.preventDefault();
    }

    function inDragRegionForLeftPanel(evt) {
        const rect = panelElement.getBoundingClientRect();
        const relativeMouseX = evt.clientX - rect.left;
        return (relativeMouseX >= (rect.right - resizableGrabRange)) && (relativeMouseX <= (rect.right + resizableGrabRange));
    }

    function inDragRegionForRightPanel(evt) {
        const relativeMouseX = evt.clientX - panelElement.offsetLeft;
        return relativeMouseX >= -resizableGrabRange && relativeMouseX <= resizableGrabRange;
    }

    function setNewWidth(width) {
        const newWidth = Math.max(resizableMinWidth, width);
        panelElement.style.width = newWidth + 'px';
    }

    function getLeftPanelWidth(pageMouseX) {
        return pageMouseX - panelElement.offsetLeft;
    }

    function getRightPanelWidth(pageMouseX) {
        const mouseXFromRight = document.body.offsetWidth - pageMouseX;
        const panelRightFromRight = document.body.offsetWidth - panelElement.getBoundingClientRect().right;
        return mouseXFromRight - panelRightFromRight;
    }

}