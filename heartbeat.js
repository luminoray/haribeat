document.addEventListener("DOMContentLoaded", function() {
    const playAudio = function (lastId) {
        let rng = Math.ceil(Math.random() * 52);
        // Prevent the last sample from being selected twice in a row.
        if (rng >= lastId) {
            rng++;
        }
        let name = 'heartbeat-' + ((rng <= 9) ? '0' : '') + rng;
        let bpm = document.getElementById('bpm').value;
        document.getElementById(name).play();
        setTimeout(function () {
            playAudio(rng)
        }, (60/bpm) * 1000);
    }

    const updateMeters = function() {
        let bpmDisplay = document.getElementById('bpm-display');
        bpmDisplay.value = document.getElementById('bpm').value;
    }

    // Iterate and append all audio files.
    let container = document.getElementById('audio-container');
    let i, audio, source, name;
    for (i = 1; i <= 53; i++) {
        name = 'heartbeat-' + ((i <= 9) ? '0' : '') + i;
        audio = document.createElement('audio');
        audio.setAttribute('preload', 'auto');
        audio.id = name;
        source = document.createElement('source');
        source.setAttribute('src', './beats/ogg/' + name + '.ogg');
        source.setAttribute('type', 'audio/ogg');
        audio.append(source);
        container.append(audio);
    }

    document.getElementById('play-button').onclick = function () {
        if (! this.hasAttribute('disabled')) {
            playAudio();
            this.setAttribute('disabled', '');
        }
    }

    document.getElementById('controls').oninput = function () {
        updateMeters();
    }

    updateMeters();
});