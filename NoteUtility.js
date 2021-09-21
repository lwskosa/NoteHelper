try {
    clear()
    var notesArray = [],
        buttonStyle = 'ui small basic icon whitegrey button',
        // Name of the element to which Utility will append to
        mainContainer = document.getElementsByClassName('assets'),
        vid = getVideoObject(),
        // Button labels
        startLabel = 'Scene Start',
        endLabel = 'Scene End',
        timestampLabel = 'Timestamp',
        clipLabel = 'Clip'

    // Marker Objct - track user selections
    class Marker {
        constructor() {
            this.startText = `-`
            this.startValue = -1
            this.endText = `-`
            this.endValue = -1
            this.clipComment = ``
            this.timestampText = `-`
            this.timestampValue = -1
            this.timestampComment = ``
        }
    }

    // Note Object - These will be listed
    class Note {
        constructor(startlabel, starttime, endlabel, endtime, note, isclip) {
            this.dateAdded = Date.now()
            this.startText = startlabel
            this.endText = endlabel
            this.startValue = starttime
            this.endValue = endtime
            this.bookmarkText = note
            this.isClip = isclip
        }
    }
    // Create Marker instance
    var marker = new Marker()


    var errorMSG = 'Start Video!',
        // Wide button width
        bigButtonWidth = 145,
        // Narrow button width
        smallButtonWidth = 96,
        // Big button height
        bigButtonHeight = 48,
        // Small button height
        smallButtonHeight = 32,
        // How long should button animations play
        transitionTime = 0.75

    // Custom styles for buttons
    var sStyles = [
        `.bigshared {
            padding-top: 12px;
            margin: auto 4px;        
        }`,
        `.smallshared {
            height: 32px;
        }`,
        `.textbold {
            font-weight: bold !important;
        }`,
        `.mt16 {
            margin-top:16px
        }`,
        `#setClipStart {
            transition: all ${transitionTime}s ease;
            width: ${bigButtonWidth}px;
            box-shadow: inset -158px 0px 3px -4px #424040;
        }`,
        `#setClipStart:hover {
            box-shadow: inset 20px 0px 3px -4px rgb(0, 208, 50);
        }`,
        `#setClipEnd {
            transition: all ${transitionTime}s ease;
            width: ${bigButtonWidth}px;
            box-shadow: inset 158px 0px 3px -4px #424040;
        }`,
        `#setClipEnd:hover {
            box-shadow: inset -20px 0px 3px -4px rgb(0, 208, 50);
        }`,
        `#setTimestamp {
            transition: all ${transitionTime}s ease;
            width: ${bigButtonWidth}px;
            box-shadow: inset 0px 0px 4px 50px #424040;
        }`,
        `#copyClip {
            transition: all ${transitionTime}s ease;
            width: ${bigButtonWidth}px;
            box-shadow: inset 0px 50px 3px 4px #424040;
        }`,
        `#copyCurrentTime {
            transition: all ${transitionTime}s ease;
            width: ${bigButtonWidth}px;
            box-shadow: inset 0px 50px 3px 4px #424040;
        }`,
        `#copyCurrentTime:hover {
            box-shadow: inset 0px 16px 2px -8px rgb(125, 8, 200);
        }`,
        `#setTimestamp:hover {
            box-shadow: inset 0px 0px 4px 4px rgb(0, 208, 50);
        }`,
        `#copyClip:hover {
            box-shadow: inset 0px 16px 2px -8px rgb(100, 8, 200);        
        }`,
        `#copyBookmarks {
            transition: all ${transitionTime}s ease;
            padding-top: 12px;
            width: ${smallButtonWidth}px;
            height: 32px;
            margin: auto 4px;
            box-shadow: inset 0px 50px 3px 4px #424040;
        }`,
        `#copyBookmarks:hover{
            box-shadow: inset 0px 16px 2px -8px rgb(0, 152, 255);
        }`,
        `#bookmarkControl > .bookmarkbutton {
            transition: all ${transitionTime}s ease;
            width: ${smallButtonWidth}px;
            height: 48px;
            margin: 8px 4px;
            box-shadow: inset 0px -96px 2px 20px #424040;
        }`,
        `#bookmarkControl > .bookmarkbutton:hover {
            box-shadow: inset 0px -16px 2px -8px rgb(0, 152, 255);
        }`,
        `#saveBookmarks {
            transition: all ${transitionTime}s ease;
            padding-top: 12px;
            width: ${smallButtonWidth}px;
            height: 32px;
            margin: auto 4px;
            box-shadow: inset -100px 0px 2px -64px #424040;
        }`,
        `#saveBookmarks:hover {
            box-shadow: inset 10px 0px 2px 8px rgb(0, 152, 255);
        }`,
        `#undoLast {
            transition: all ${transitionTime}s ease;
            box-shadow: inset 0px 0px 4px 64px #424040;
            width: ${smallButtonWidth}px;
            margin-left: 52px;
        }`,
        `#undoLast:hover {
            box-shadow: inset 0px 0px 4px 4px rgb(255, 255, 50);
        }`,
        `#deleteAll {
        transition: all ${transitionTime}s ease;
        box-shadow: inset 32px 32px 4px 4px rgb(185, 78, 0);
        width: ${smallButtonWidth}px;
        }`,
        `#deleteAll:hover {
            box-shadow: 0px 0px 4px 4px rgb(222, 0, 0);
            background-color: rgb(222, 0, 0) !important;
        }`,
        `.entrytext{
            margin: auto 0;
        }`,
        `.entrybutton {
            transition: all ${transitionTime}s ease;
            width: 64px;
            height: 22px;
            background-color: rgb(200,200,200);
            color: black;
            margin: 4px 12px;
            border: 8px black;
        }`,
        `.entrybutton:hover {
            background-color: rgb(255, 255, 64);
        }`,
        `.startborder{
            border-radius: 12px 0 0 12px;
        }`,
        `.endborder{
            border-radius: 0 12px 12px 0;
        }`,
        `.fullborder{
            border-radius: 12px;
        }`,
        `.entryitem {
            transition: all ${transitionTime}s ease;
            display: grid;
            grid-template-columns: 88px auto;
            background-color: rgba(0, 0, 0, 0.25);
            margin-top: 4px;
        }`,
        `.entryitem:hover {
            display: grid;
            grid-template-columns: 88px auto;
            background-color: rgba(0, 0, 0, 0.75);
            margin-top: 4px;
        }`,
    ]

    var newLine = document.createElement('br')
    var sStyle = document.createElement('style')
    sStyle.innerHTML = sStyles.join('')
    sStyle.id = 'customStyle'

    var accDiv = document.createElement('div')
    accDiv.id = 'accUtil'
    accDiv.className = 'mt16'

    var markerControl = document.createElement('div')
    markerControl.id = 'markerControl'
    markerControl.className = 'mt16'
    markerControl.innerHTML = `Marker Control<br>`

    var clipboardControl = document.createElement('div')
    clipboardControl.id = 'clipboardControl'
    clipboardControl.className = 'mt16'
    clipboardControl.innerHTML = `Copy to Clipboard<br>`

    var bookmarkControl = document.createElement('div')
    bookmarkControl.id = 'bookmarkControl'
    bookmarkControl.className = 'mt16'
    bookmarkControl.innerHTML = `Bookmark Control<br>`

    var bookmarkList = document.createElement('div')
    bookmarkList.id = 'bookmarkList'
    bookmarkList.className = 'mt16'

    //#region BUTTONS AND LABELS

    var startButton = document.createElement('button')
    startButton.innerHTML = `${startLabel}<br>(-)`
    startButton.onclick = setStartTime
    startButton.onmouseover = function() { buttonValidator() }
    startButton.className = `${buttonStyle} textbold bigshared`
    startButton.id = 'setClipStart'

    // Stop Clip Marker
    var endButton = document.createElement('button')
    endButton.innerHTML = `${endLabel}<br>(-)`
    endButton.onclick = setEndTime
    endButton.onmouseover = function() { buttonValidator() }
    endButton.className = `${buttonStyle} textbold bigshared`
    endButton.id = 'setClipEnd'

    // Set Timestamp
    var setTimestampButton = document.createElement('button')
    setTimestampButton.innerHTML = `${timestampLabel}<br>(-)`
    setTimestampButton.onclick = function() { setTimeStamp(true) }
    setTimestampButton.onmousemove = function() { setTimeStamp(false) }
    setTimestampButton.onmouseover = function() {
        buttonValidator()
        setTimeStamp(false)
    }
    setTimestampButton.className = `${buttonStyle} textbold bigshared`
    setTimestampButton.id = 'setTimestamp'
        // COPY TO MARKERS TO CLIPBOARD PANEL
        // Copy Clip Timestamps
    var copyClipButton = document.createElement('button')
    copyClipButton.innerHTML = `${clipLabel}<br>(-)`
    copyClipButton.onclick = function() { copyClip(false) }
    copyClipButton.ondblclick = function() { copyClip(true) }
    copyClipButton.onmouseover = function() { buttonValidator() }
    copyClipButton.className = `${buttonStyle} textbold bigshared`
    copyClipButton.id = 'copyClip'
    copyClipButton.disabled = true

    // Copy Timestamp
    var copyTimestampButton = document.createElement('button')
    copyTimestampButton.innerHTML = `${timestampLabel}<br>(${marker.timestampText})`
    copyTimestampButton.onclick = function() { copyTimestamp(false) }
    copyTimestampButton.ondblclick = function() { copyTimestamp(true) }
    copyTimestampButton.onmouseover = function() { buttonValidator() }
    copyTimestampButton.className = `${buttonStyle} textbold bigshared`
    copyTimestampButton.id = 'copyCurrentTime'
    copyTimestampButton.disabled = true

    //

    var copyBookmarksButton = document.createElement('button')
    copyBookmarksButton.innerHTML = `Copy`
    copyBookmarksButton.onclick = function() { copyAllBookmarks() }
    copyBookmarksButton.onmouseover = function() { buttonValidator() }
    copyBookmarksButton.className = `${buttonStyle} textbold smallshared`
    copyBookmarksButton.id = 'copyBookmarks'
    copyBookmarksButton.disabled = true

    var saveBookmarksButton = document.createElement('button')
    saveBookmarksButton.innerHTML = `Save`
    saveBookmarksButton.onclick = function() { saveAllBookmarks() }
    saveBookmarksButton.onmouseover = function() { buttonValidator() }
    saveBookmarksButton.className = `${buttonStyle} textbold smallshared`
    saveBookmarksButton.id = 'saveBookmarks'
    saveBookmarksButton.disabled = true

    var undoButton = document.createElement('button')
    undoButton.innerHTML = `Undo`
    undoButton.ondblclick = function() { undoBookmark() }
    undoButton.onmousemove = function() { buttonValidator() }
    undoButton.className = `${buttonStyle} textbold smallshared`
    undoButton.id = 'undoLast'
    undoButton.disabled = true

    var deleteButton = document.createElement('button')
    deleteButton.innerHTML = `Delete`
    deleteButton.ondblclick = function() { deleteBookmarks() }
    deleteButton.onmouseover = function() { buttonValidator() }
    deleteButton.className = `${buttonStyle} textbold smallshared`
    deleteButton.id = 'deleteAll'
    deleteButton.disabled = true

    var addClipBookmark = document.createElement('button')
    addClipBookmark.innerHTML = `${clipLabel}<br>(Marker)`
    addClipBookmark.onclick = function() { addBookmark(0) }
    addClipBookmark.onmouseover = function() { buttonValidator() }
    addClipBookmark.className = `${buttonStyle} textbold bookmarkbutton`
    addClipBookmark.id = 'addClipBookmark'
    addClipBookmark.disabled = true

    var addTimestampBookmark = document.createElement('button')
    addTimestampBookmark.innerHTML = `${timestampLabel}<br>(Marker)`
    addTimestampBookmark.onclick = function() { addBookmark(1) }
    addTimestampBookmark.onmouseover = function() { buttonValidator() }
    addTimestampBookmark.className = `${buttonStyle} textbold bookmarkbutton`
    addTimestampBookmark.id = 'addTimestampBookmark'
    addTimestampBookmark.disabled = true

    var addCurrentTimeBookmark = document.createElement('button')
    addCurrentTimeBookmark.innerHTML = `${timestampLabel}<br>(Now)`
    addCurrentTimeBookmark.onclick = function() { addBookmark(2) }
    addCurrentTimeBookmark.onmouseover = function() { buttonValidator() }
    addCurrentTimeBookmark.onmousemove = function() { buttonValidator() }
    addCurrentTimeBookmark.className = `${buttonStyle} textbold bookmarkbutton`
    addCurrentTimeBookmark.id = 'addCurrentTimeBookmark'

    //#endregion

    // FUNCTIONS - SET MARKERS
    //#region SET MARKERS
    function setStartTime() {
        marker.startText = getTimeStamp()
        marker.startValue = getTimeCode()
        startButton.innerHTML = `${startLabel}<br>(${marker.startText})`
        updateClipLabel()
        buttonValidator()
    }


    function setEndTime() {
        marker.endText = getTimeStamp()
        marker.endValue = getTimeCode()
        endButton.innerHTML = `${endLabel}<br>(${marker.endText})`
        updateClipLabel()
        buttonValidator()
    }

    function setTimeStamp(setMarker) {

        if (setMarker) {
            marker.timestampText = getTimeStamp()
            marker.timestampValue = getTimeCode()
            copyTimestampButton.innerHTML = `${timestampLabel}<br>(${marker.timestampText})`
            setTimestampButton.innerHTML = `${timestampLabel}<br>(${getTimeStamp()})`
            buttonValidator()
        }
        setTimestampButton.innerHTML = `${timestampLabel}<br>(${getTimeStamp()})`
    }
    //#endregion

    //#region FUNCTIONS - COPY TO CLIPBOARD

    function copyClip(addNote) {
        updateClipLabel()
        getVideoObject().pause()
        if (addNote) {
            var note = setNote()
            navigator.clipboard.writeText(`(${marker.startText}-${marker.endText}) - ${note} `)
        } else {
            navigator.clipboard.writeText(`(${marker.startText}-${marker.endText}) `)
        }
    }

    function copyTimestamp(addNote) {
        updateClipLabel()
        getVideoObject().pause()
        if (addNote) {
            var note = setNote()
            navigator.clipboard.writeText(`(${marker.timestampText}) - ${note} `)
        } else {
            navigator.clipboard.writeText(`(${marker.timestampText}) `)
        }
    }
    //#endregion

    //#region FUNCTIONS - BOOKMARKS
    function addBookmark(bookmarkType) {
        if (getVideoObject().currentTime > 0) {
            getVideoObject().pause()
            var note = setNote()
        } else {
            return
        }
        switch (bookmarkType) {
            case 0:
                if (marker.startText == errorMSG) {
                    marker.startText = '0'
                    marker.startValue = 0.0
                }
                if (marker.endText == errorMSG) {
                    marker.endText = '0'
                    marker.endValue = 0.0
                }
                notesArray.push(new Note(marker.startText, marker.startValue, marker.endText, marker.endValue, note, true))
                break

            case 1:
                // notesArray.push(new Note(getTimeStamp(), getVideoObject().currentTime, getTimeStamp(), getVideoObject().currentTime, note, false))
                if (marker.timestampText == errorMSG) {
                    marker.timestampText = '0'
                    marker.timestampValue = 0.0
                }
                notesArray.push(new Note(marker.timestampText, marker.timestampValue, marker.timestampText, marker.timestampValue, note, false))
                break
            case 2:

                notesArray.push(new Note(getTimeStamp(), getVideoObject().currentTime, getTimeStamp(), getVideoObject().currentTime, note, false))
                break
            default:
                alert(`Something went wrong!`)
                break
        }
        drawBookmarks()
        buttonValidator()
    }

    function undoBookmark() {
        if (notesArray.length > 0) {
            notesArray.sort((a, b) => (a.dateAdded > b.dateAdded) ? 1 : -1).pop()
        }
        drawBookmarks()
    }

    function drawBookmarks() {
        while (document.getElementById('bookmarkList').lastChild) {
            document.getElementById('bookmarkList').lastChild.remove()
        }

        for (let note of notesArray.sort((a, b) => (a.startValue > b.startValue) ? 1 : -1)) {
            var entryRow = document.createElement('div')
            entryRow.className = 'entryitem'
            entryRow.ondblclick = function() { editBookmark(note) }
            var buttonContainer = document.createElement('div')
            buttonContainer.className = 'buttonContainer'

            switch (note.isClip) {
                case true:
                    var startEntryButton = document.createElement('button')
                    startEntryButton.className = `entrybutton startborder textbold`
                    startEntryButton.innerHTML = note.startText
                    startEntryButton.value = note.startValue
                    startEntryButton.onclick = function() { jumpToTimestamp(note) }
                    startEntryButton.ondblclick = function() { copyNote(note) }

                    var endEntryButton = document.createElement('button')
                    endEntryButton.className = `entrybutton endborder textbold`
                    endEntryButton.innerHTML = note.endText
                    endEntryButton.value = note.endValue
                    endEntryButton.onclick = function() { jumpToTimestamp(note) }
                    endEntryButton.ondblclick = function() { copyNote(note) }

                    var entryText = document.createElement('span')
                    entryText.className = 'entrytext'
                    entryText.innerHTML = note.bookmarkText

                    bookmarkList.appendChild(entryRow)
                    entryRow.appendChild(buttonContainer)
                    buttonContainer.appendChild(startEntryButton)
                    buttonContainer.appendChild(endEntryButton)
                    entryRow.appendChild(entryText)
                    break

                case false:
                    var entryButton = document.createElement('button')
                    entryButton.className = `entrybutton fullborder textbold`
                    entryButton.innerHTML = note.startText
                    entryButton.value = note.startValue
                    entryButton.onclick = function() { jumpToTimestamp(note) }
                    entryButton.ondblclick = function() { copyNote(note) }

                    var entryText = document.createElement('span')
                    entryText.className = 'entrytext'
                    entryText.innerHTML = note.bookmarkText

                    bookmarkList.appendChild(entryRow)
                    entryRow.appendChild(buttonContainer)
                    buttonContainer.appendChild(entryButton)
                    entryRow.appendChild(entryText)
                    break

                default:
                    break
            }
        }
    }
    //#endregion

    //#region FUNCTIONS - Helper Functions

    function getTimeStamp() {
        var timecodes = document.getElementsByClassName('vjs-time-tooltip')
        if (timecodes[1].innerHTML == '') {
            return errorMSG
        } else {
            return timecodes[1].innerHTML
        }
    }

    function getTimeCode() {
        return document.querySelector('video').currentTime
    }

    function setNote() {
        return prompt(`Enter your thoughts or description - short or long\nLeave empty for no note`)
    }

    function updateClipLabel() {
        if (marker.startText == errorMSG && marker.endText == errorMSG) {
            copyClipButton.innerHTML = `${clipLabel}<br>(${errorMSG})`
        } else if (marker.startText == errorMSG && marker.endText != errorMSG) {
            marker.startText = '-'
        } else if (marker.startText != errorMSG && marker.endText == errorMSG) {
            marker.endText = '-'
        }
        copyClipButton.innerHTML = `${clipLabel}<br>(${marker.startText}-${marker.endText})`
    }

    function cleanUp() {
        while (document.getElementsByClassName('assets')[0].children.length > 0) {
            document.getElementsByClassName('assets')[0].lastChild.remove()
        }
        if (document.getElementById('customStyle')) {
            document.getElementById('customStyle').remove()
        }
    }

    function jumpToTime(timecode, copyEntry) {
        getVideoObject().currentTime = timecode
        if (copyEntry) {
            navigator.clipboard.writeText(`(${marker.timestampText}) `)
        }
    }

    function jumpToTimestamp(note) {
        getVideoObject().currentTime = note.startValue
        getVideoObject().play()
    }

    function copyNote(note) {
        navigator.clipboard.writeText(`(${note.startText}) - ${note.bookmarkText} `)
    }

    function copyAllBookmarks() {
        var tempArray = []
        for (let bookmark of notesArray) {
            if (bookmark.isClip) {
                tempArray.push(`(${bookmark.startText}-${bookmark.endText}) - ${bookmark.bookmarkText} `)
            } else {
                tempArray.push(`(${bookmark.startText}) - ${bookmark.bookmarkText} `)
            }
        }
        getVideoObject().pause()
        navigator.clipboard.writeText(`${tempArray.join('\n')}\n`)
    }

    function buttonValidator() {
        if (notesArray.length == 0) {
            copyBookmarksButton.disabled = true
            saveBookmarksButton.disabled = true
            undoButton.disabled = true
        } else {
            saveBookmarksButton.disabled = false
            copyBookmarksButton.disabled = false
            undoButton.disabled = false
        }

        if (localStorage.getItem(getMovieName()) === null) {
            deleteButton.disabled = true
        } else {
            deleteButton.disabled = false
        }

        if ((marker.startValue == -1 && marker.startText == errorMSG) || (marker.endValue == -1 && marker.endText == errorMSG)) {
            addClipBookmark.disabled = true
            copyClipButton.disabled = true
        } else if ((marker.startText == '-' && marker.startValue == 0) || (marker.endText == '-' && marker.endValue == 0)) {
            addClipBookmark.disabled = true
            copyClipButton.disabled = true
        } else if ((marker.startText == '-' && marker.startValue == -1) || (marker.endText == '-' && marker.endValue == -1)) {
            addClipBookmark.disabled = true
            copyClipButton.disabled = true
        } else {
            addClipBookmark.disabled = false
            addClipBookmark.innerHTML = `${clipLabel}<br>(Marker)`
            copyClipButton.disabled = false
        }
        if (marker.timestampValue == -1 || marker.timestampText == errorMSG) {
            addTimestampBookmark.disabled = true

            copyTimestampButton.disabled = true
        } else {
            addTimestampBookmark.disabled = false
            copyTimestampButton.disabled = false

        }
        if (getVideoObject().currentTime == 0) {
            addCurrentTimeBookmark.innerHTML = `${timestampLabel}<br>(-)`
        } else {
            addCurrentTimeBookmark.disabled = false
            addCurrentTimeBookmark.innerHTML = `${timestampLabel}<br>(Now)`
        }

    }

    function getVideoObject() {
        return document.querySelector('video')
    }

    function editBookmark(note) {
        var newText = prompt("Edit Bookmark", note.bookmarkText)
        newText = newText == null ? note.bookmarkText : newText
        note.bookmarkText = newText
        drawBookmarks()
    }

    function saveAllBookmarks() {
        localStorage.removeItem(getMovieName())
        localStorage.setItem(getMovieName(), JSON.stringify(notesArray))
        buttonValidator()
    }

    function deleteBookmarks() {
        if (confirm(`Are you sure you want to delete bookmarks for ${getMovieName().toUpperCase()}?\nThis action CANNOT be undone.`)) {
            localStorage.removeItem(getMovieName())
            notesArray.length = 0
            drawBookmarks()
            drawBookmarks()
            buttonValidator()
        }
    }

    function getMovieName() {
        return document.URL.slice(34)
    }

    function getVideoObject() {
        return document.querySelector('video')
    }
    //#endregion
    cleanUp()
        // Create Style
    document.head.appendChild(sStyle)
        // Create main container for Utility
    mainContainer[0].appendChild(accDiv)
        // Create sub-sections
    accDiv.appendChild(markerControl)
    accDiv.appendChild(clipboardControl)
    accDiv.appendChild(bookmarkControl)
    accDiv.appendChild(bookmarkList)
        // Add Marker Controls
    markerControl.appendChild(startButton)
    markerControl.appendChild(endButton)
    markerControl.appendChild(setTimestampButton)
        // Add Clipboard Controls
    clipboardControl.appendChild(copyClipButton)
    clipboardControl.appendChild(copyTimestampButton)
        // Add Bookmark Controls
    bookmarkControl.appendChild(copyBookmarksButton)
    bookmarkControl.appendChild(saveBookmarksButton)
    bookmarkControl.appendChild(undoButton)
    bookmarkControl.appendChild(deleteButton)
    bookmarkControl.appendChild(newLine)
    bookmarkControl.appendChild(addClipBookmark)
    bookmarkControl.appendChild(addTimestampBookmark)
    bookmarkControl.appendChild(addCurrentTimeBookmark)
        // Load Saved Data if present
    if (localStorage.getItem(getMovieName()) !== null) {
        notesArray = JSON.parse(localStorage.getItem(getMovieName()))
        drawBookmarks()
        buttonValidator()
    }
} catch (error) {
    alert('Error! Something went wrong.')
}