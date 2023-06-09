$(function () {
    function getJLPT(ch) {
        let kanjiData;
        fetch(`https://kanjiapi.dev/v1/kanji/${ch}`, {mode: 'cors'})
            .then(res => res.json())
            .then(data => {
                kanjiData = data.jlpt
            })
            .catch(error => console.error(error))
        return kanjiData
    }
    let kanjis;
    fetch('https://kanjiapi.dev/v1/kanji/joyo', {mode: 'cors'})
        .then(res => res.json())
        .then(data => kanjis = data)
        .catch(error => console.error(error))

    $('.checkboxes input[type="checkbox"]').on('change', function () {
        var selectedLevels = $('.checkboxes input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get();

        displayKanjis(kanjis, selectedLevels);
    });

    $('#submitBtn').on('click', function () {
        var checkedCount = $('.kanjis input[type="checkbox"]:checked').length;
        alert(`You know ${checkedCount} kanjis!`)
    });

    function displayKanjis(kanjis, levels) {
        const filteredKanjis = kanjis.filter(kanji => levels.includes(String(getJLPT(kanji))));

        $('.kanjis').empty();

        filteredKanjis.forEach(kanji => {
            var kanjiDiv = $('<div>').addClass('kanji-item');

            var checkbox = $('<input>')
                .attr('type', 'checkbox')
                .attr('value', kanji)
                .addClass('checkbox-item');

            var label = $('<label>')
                .addClass('checkbox-label')
                .append(kanji, '<br>', checkbox);

            kanjiDiv.append(label);

            $('.kanjis').append(kanjiDiv);
        });
    }
});