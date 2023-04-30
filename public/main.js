var trash = document.getElementsByClassName("fa-trash-o");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const position = this.parentNode.parentNode.childNodes[3].innerText
    const team = this.parentNode.parentNode.childNodes[5].innerText
    const pointsPerGame = this.parentNode.parentNode.childNodes[7].innerText
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleteName: name,
        deleteplayerPosition: position,
        deleteplayerTeam: team,
        deletepointsPerGame: pointsPerGame
      }),
    }).then(function (response) {
      window.location.reload()
    })
  });
});
