const CHOICES = {
    PIERRE: 'pierre',
    PAPIER: 'papier',
    CISEAUX: 'ciseaux'
  };
  
  const RESULT = {
    PLAYER1_WIN: 1,
    PLAYER2_WIN: 2,
    TIE: 0
  };
  
  function determineWinner(player1Choice, player2Choice) {
    if (player1Choice === player2Choice) {
      return RESULT.TIE;
    } else if (
      (player1Choice === CHOICES.PIERRE && player2Choice === CHOICES.CISEAUX) ||
      (player1Choice === CHOICES.PAPIER && player2Choice === CHOICES.PIERRE) ||
      (player1Choice === CHOICES.CISEAUX && player2Choice === CHOICES.PAPIER)
    ) {
      return RESULT.PLAYER1_WIN;
    } else {
      return RESULT.PLAYER2_WIN;
    }
  }
  
  module.exports = {
    CHOICES,
    RESULT,
    determineWinner
  };
  