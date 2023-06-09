$(function () {
    $.getJSON('Kanjidic.json')
        .done(function (data) {
            if (Array.isArray(data.kanjis)) {
                var kanjis = data.kanjis;
                $('.checkboxes input[type="checkbox"]').on('change', function () {
                    var selectedLevels = $('.checkboxes input[type="checkbox"]:checked').map(function () {
                        return this.value;
                    }).get();
                    displayKanjis(kanjis, selectedLevels);
                });
            } else {
                console.error('Invalid JSON data: Kanjis is not an array');
            }
        })
        .fail(function (jqxhr, textStatus, error) {
            console.error('Error loading JSON file:', error);
        });

    $('#submitBtn').on('click', function () {
        var checkedCount = $('.kanjis input[type="checkbox"]:checked').length;
        alert(`You know ${checkedCount} kanjis!`)
    });

    function displayKanjis(kanjis, levels) {
        var filteredKanjis = kanjis.filter(function (kanji) {
            return levels.includes(kanji.jlpt);
        });

        $('.kanjis').empty();

        filteredKanjis.forEach(function (kanji) {
            var literal = kanji.kanji;

            var kanjiDiv = $('<div>').addClass('kanji-item');

            var kanjiSpan = $('<span>').text(literal);
            kanjiDiv.append(kanjiSpan);

            var checkbox = $('<input>').attr('type', 'checkbox').attr('value', literal).attr('');
            kanjiDiv.append(checkbox);

            $('.kanjis').append(kanjiDiv);
        });
    }
});