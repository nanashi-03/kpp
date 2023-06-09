$(function () {
    $.getJSON('Kanjidic.json')
        .done(function (data) {
            if (data) {
                var kanjis = data.kanjis;
                $('.checkboxes input[type="checkbox"]').on('change', function () {
                    var selectedLevels = $('.checkboxes input[type="checkbox"]:checked').map(function () {
                        return this.value;
                    }).get();
                    displayKanjis(kanjis, selectedLevels);
                });
            } else {
                console.error('Invalid JSON data');
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
        var filteredKanjis = {};

        for (var key in kanjis) {
            if (levels.includes(String(kanjis[key].jlpt))) {
                filteredKanjis[key] = kanjis[key];
            }
        }

        $('.kanjis').empty();

        for (var key in filteredKanjis) {
            if (filteredKanjis.hasOwnProperty(key)) {
                var kanji = filteredKanjis[key];
                var literal = kanji.kanji;

                var kanjiDiv = $('<div>').addClass('kanji-item');

                var checkbox = $('<input>')
                    .attr('type', 'checkbox')
                    .attr('value', literal)
                    .addClass('checkbox-item');

                var label = $('<label>')
                    .addClass('checkbox-label')
                    .append(literal, '<br>', checkbox);

                kanjiDiv.append(label);

                $('.kanjis').append(kanjiDiv);
            }
        }
    }
});