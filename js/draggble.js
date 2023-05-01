const defaultConfig = {
    open: true,
    debug: true,
    animatable: true,
}

export default function draggble($element, config = defaultConfig) {
    if (!($element instanceof HTMLElement)) {
        return console.warn(`Se esperaba un elemento HTML y se recibió ${$elemet}`)
    }

    let isOpen = config.open
    let isDragging = false
    const elementRect = $element.getBoundingClientRect()
    const ELEMENT_BLOCK_SIZE = elementRect.height

    const $maker = $element.querySelector('[data-marker]')
    const MARKER_BLOCK_SIZE = $maker.getBoundingClientRect().height

    const VISIBLE_Y_POSITTION = 0
    const HIDDEN_Y_POSITTION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
    let widgetPosition = VISIBLE_Y_POSITTION

    isOpen ? open() : close()

    let startY = 0

    $maker.addEventListener("click", handleClick)
    $maker.addEventListener("pointerdown", handlePointerDown)
    $maker.addEventListener("pointerup", handlePointerUp)
    $maker.addEventListener("pointerout", handlePointerOut)
    $maker.addEventListener("pointercancel", handlePointerCancel)
    $maker.addEventListener("pointermove", handlePointerMove)

    if (config.animatable) {
        setAnimation()
    }

    function handlePointerDown(event) {
        logger('Pointer DOWN')
        starDrag(event)
    }
    function handlePointerUp() {
        logger('Pointer UP')
        dragEnd()
    }
    function handlePointerOut() {
        logger('Pointer OUT')
        bounce()
    }
    function handlePointerCancel() {
        logger('Pointer CANCEL')
        bounce()
    }

    function handlePointerMove(event) {
        logger('Pointer MOVE')
        drag(event)
    }

    function handleClick(event) {
        logger('CLICK')
        toggle()
    }
    function pageY(event) {
        return event.pageY || event.touches[0].pageY
    }
    function starDrag(event) {
        isDragging = true
        startY = pageY(event)
    }

    function setAnimation() {
        $element.style.transition = 'margin-bottom .3s'
    }
    function bounce(){
        if(widgetPosition<ELEMENT_BLOCK_SIZE/2){
            return open()
        }
        return close()
    }
    function dragEnd(){
        logger('DRAG END')
        isDragging=false
        bounce()
    }
    function toggle() {
        if (!isDragging) {
            if (!isOpen) {
                return open()
            }
            return close()
        }
    }
    function logger(message) {
        if (config.debug) {
            console.info(message)
        }
    }


    function open() {
        logger('Abrir widget')
        isOpen = true
        widgetPosition = VISIBLE_Y_POSITTION
        setWidgetPosition(widgetPosition)
    }
    function close() {
        logger('Cerrar widget')
        isOpen = false
        widgetPosition = HIDDEN_Y_POSITTION
        setWidgetPosition(widgetPosition)
    }

    function setWidgetPosition(value) {
        $element.style.marginBottom = `-${value}px`
    }
    function drag(event) {
        const cursorY = pageY(event)
        const movementY = cursorY - startY
        widgetPosition = widgetPosition + movementY
        startY = cursorY
        if(widgetPosition >HIDDEN_Y_POSITTION){
            return false
        }       
        setWidgetPosition(widgetPosition)
    }
}