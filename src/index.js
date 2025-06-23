const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  console.log(`

`);
  console.log("🏁🚦 Bem-vindo à Corrida BARUDI entre Mario 🍄 e Luigi 👨‍🔧!\n");

  for (let round = 1; round <= 5; round++) {
    console.log(`\n🌟═══════════════════════════════════════════════🌟`);
    console.log(`🏁 𝗥𝗢𝗗𝗔𝗗𝗔 ${round}  |  ${character1.NOME} 🍄  🆚  ${character2.NOME} 👨‍🔧`);
    console.log(`🌟═══════════════════════════════════════════════🌟`);

    // sortear bloco
    let block = await getRandomBlock();
    let blockEmoji = block === "RETA" ? "➡️" : block === "CURVA" ? "↩️" : "⚡";
    console.log(`🟦 Bloco: ${block} ${blockEmoji}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME + " 🍄",
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME + " 👨‍🔧",
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME + " 🍄",
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME + " 👨‍🔧",
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      // Sorteio do tipo de confronto
      const tipos = [
        { nome: 'casco', pontos: -1, figura: '🐢' },
        { nome: 'bomba', pontos: -2, figura: '💣' }
      ];
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];

      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`\n⚡ ${character1.NOME} 🍄 confrontou com ${character2.NOME} 👨‍🔧! 🥊`);
      console.log(`🎲 Tipo do confronto: ${tipo.nome.toUpperCase()} ${tipo.figura} (${tipo.pontos} ponto${tipo.pontos === -2 ? 's' : ''})`);

      await logRollResult(
        character1.NOME + " 🍄",
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME + " 👨‍🔧",
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2) {
        character2.PONTOS = Math.max(0, character2.PONTOS + tipo.pontos);
        character1.PONTOS += 1; // turbo
        console.log(
          `🏆 ${character1.NOME} 🍄 ${tipo.figura} venceu o confronto! ${character2.NOME} 👨‍🔧 perdeu ${Math.abs(tipo.pontos)} ponto(s) | ${character1.NOME} 🍄 ganhou 1 turbo 🚀`
        );
      } else if (powerResult2 > powerResult1) {
        character1.PONTOS = Math.max(0, character1.PONTOS + tipo.pontos);
        character2.PONTOS += 1; // turbo
        console.log(
          `🏆 ${character2.NOME} 👨‍🔧 ${tipo.figura} venceu o confronto! ${character1.NOME} 🍄 perdeu ${Math.abs(tipo.pontos)} ponto(s) | ${character2.NOME} 👨‍🔧 ganhou 1 turbo 🚀`
        );
      } else {
        console.log("🤝 Confronto empatado! Nenhum ponto foi perdido.");
      }
    }

    // verificando o vencedor
    if (block !== "CONFRONTO") {
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`✅ ${character1.NOME} 🍄 marcou um ponto!`);
        character1.PONTOS++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`✅ ${character2.NOME} 👨‍🔧 marcou um ponto!`);
        character2.PONTOS++;
      } else {
        console.log("🤝 Empate! Ninguém marcou ponto.");
      }
    }

    console.log(`\n📊 𝗣𝗟𝗔𝗖𝗔𝗥 𝗣𝗔𝗥𝗖𝗜𝗔𝗟:`);
    console.log(`   🏎️ ${character1.NOME} 🍄: ${character1.PONTOS} ponto(s)`);
    console.log(`   🏎️ ${character2.NOME} 👨‍🔧: ${character2.PONTOS} ponto(s)`);
    console.log("═════════════════════════════════════════════════════");
  }
}

async function declareWinner(character1, character2) {
  console.log("\n🏁🏁🏁 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢 𝗙𝗜𝗡𝗔𝗟 🏁🏁🏁");
  console.log(`   🏎️ ${character1.NOME} 🍄: ${character1.PONTOS} ponto(s)`);
  console.log(`   🏎️ ${character2.NOME} 👨‍🔧: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n🎉 ${character1.NOME} 🍄 venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n🎉 ${character2.NOME} 👨‍🔧 venceu a corrida! Parabéns! 🏆`);
  else console.log("🤝 A corrida terminou em empate!");
}

(async function main() {
  console.log(`
🏁🚨 Corrida entre Mario e Luigi começando...



⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
Mario 🍄 vs Luigi 👨‍🔧
`);

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
