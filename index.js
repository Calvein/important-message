var hash = location.hash.slice(1)
if (hash) {
    var params = hash.split('&').sort().map(function(param) {
        return decodeURIComponent(param.replace(/\w*=/, ''))
    })
    showSection('message')
    showMessage(params[1], params[0])
} else {
    showSection('form')
}

// Show section
function showSection(section) {
    $('[data-section=' + section + ']').hidden = false
    $('[data-section]:not([data-section=' + section + '])').hidden = true
}

// Handle form
$('form').addEventListener('submit', function(e) {
    e.preventDefault()
    var msg = $('textarea').value
    var flags = $('select').value
    showMessage(msg, flags)
})

// Show message
function showMessage(msg, flags) {
    $('.message').textContent = msg

    var i = 0
    while (i++ < flags) addFlag(i / flags <= .5 ? 'left' : 'right')

    // Change the hash for sharing
    location.hash = 'msg=' + msg + '&flags=' + flags

    showSection('message')
}

function addFlag(side) {
    flag = document.createElement('div')
    flag.className = 'flag'
    $('[data-side=' + side + ']').appendChild(flag)
}

// Reset form
$('.reset').addEventListener('click', function(e) {
    showSection('form')
})

// jQuery
function $(sel, parent) {
    parent = parent || document
    return parent.querySelector(sel)
}