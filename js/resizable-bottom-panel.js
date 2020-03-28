function resizableBottomPanel(bottomPanelElement) {
    const resizableGrabRange = 4;
    const resizableMinHeight = 10;
    let changedCursor = false;
    let dragging = false;

    document.addEventListener('mousemove', mouseMoveG, true);
    document.addEventListener('mouseup', mouseUpG, true);
    document.addEventListener('mousedown', mouseDown, true);

    function mouseDown(evt) {
        if (inDragRegion(evt)) {
            dragging = true;
            evt.stopPropagation();
        }
    }

    function mouseMoveG(evt) {
        if (dragging || inDragRegion(evt)) {
            document.body.style.cursor = 'ns-resize';
            changedCursor = true;
        } else {
            if (changedCursor) {
                document.body.style.cursor = 'default';
                changedCursor = false;
            }
        }

        if (dragging) {
            setNewHeight(getBottomPanelHeight(evt.clientY));
            evt.stopPropagation();
            evt.preventDefault();
        }
    }

    function mouseUpG(evt) {
        if (!dragging) {
            return;
        }
        dragging = false;
        evt.stopPropagation();
        evt.preventDefault();
    }

    function inDragRegion(evt) {
        const relativeMouseY = evt.clientY - bottomPanelElement.getBoundingClientRect().top;
        return relativeMouseY >= (-1 * resizableGrabRange) && relativeMouseY <= resizableGrabRange;
    }

    function setNewHeight(height) {
        const newHeight = Math.max(resizableMinHeight, height);
        bottomPanelElement.style.height = newHeight + 'px';
    }

    function getBottomPanelHeight(pageMouseY) {
        const mouseYFromBottom = document.body.offsetHeight - pageMouseY;
        const bottomPanelFromBottom = document.body.offsetHeight - bottomPanelElement.getBoundingClientRect().bottom;
        return mouseYFromBottom - bottomPanelFromBottom;
    }
}