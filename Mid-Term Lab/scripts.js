function loadProject(projectFile) {
    $.get(projectFile, function(data) {
        alert(data);
    });
}
function toggleCard(cardId) {
    var card = document.getElementById(cardId);
    card.classList.toggle('collapsed');
}
