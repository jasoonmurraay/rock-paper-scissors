import Head from "next/head";
import classes from "../styles/Home.module.css";
import { useState, MouseEvent, useCallback, useEffect } from "react";
import Image from "next/image";
import RockIcon from "@/components/RockIcon";
import PaperIcon from "@/components/PaperIcon";
import ScissorsIcon from "@/components/ScissorsIcon";

export default function Home() {
  const [showRules, setShowRules] = useState<boolean>(false);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [cpuScore, setCpuScore] = useState<number>(0);
  const [userMoves, setUserMoves] = useState<string[]>([]);
  const [comMoves, setComMoves] = useState<string[]>([]);
  const [showingMoves, setShowingMoves] = useState<boolean>(false);
  const [playerResult, setPlayerResult] = useState<string[]>([]);

  const computerMoveDict = ["rock", "paper", "scissors"];

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.target instanceof HTMLImageElement) {
      return;
    }
    const value = (event.target as HTMLButtonElement).value;
    playHandler(value);
  };

  const handleIconClick = (event: MouseEvent<HTMLImageElement>) => {
    const image = event.target as HTMLImageElement;
    const value = (image.parentElement?.parentElement as HTMLButtonElement)
      .value;
    playHandler(value);
  };

  const playHandler = (playerMove: string) => {
    let computerMove = computerMoveDict[Math.floor(Math.random() * 3)];
    console.log("Player Move: ", playerMove);
    console.log("cpu move: ", computerMove);
    const newPlayerState = [...userMoves, playerMove];
    const newCPUMoves = [...comMoves, computerMove];
    setUserMoves(newPlayerState);
    setComMoves(newCPUMoves);
    setShowingMoves(true);
    if (computerMove === playerMove) {
      let result = [...playerResult, "tie"];
      setPlayerResult(result);
    } else if (playerMove === "rock") {
      let result;
      switch (computerMove) {
        case "paper":
          setCpuScore((prevScore) => prevScore + 1);
          result = [...playerResult, "lose"];
          setPlayerResult(result);
          break;
        case "scissors":
          setPlayerScore((prevScore) => prevScore + 1);
          result = [...playerResult, "win"];
          setPlayerResult(result);
          break;
      }
    } else if (playerMove === "paper") {
      let result;
      switch (computerMove) {
        case "rock":
          setPlayerScore((prevScore) => prevScore + 1);
          result = [...playerResult, "win"];
          setPlayerResult(result);
          break;
        case "scissors":
          setCpuScore((prevScore) => prevScore + 1);
          result = [...playerResult, "lose"];
          setPlayerResult(result);
          break;
      }
    } else {
      let result;
      switch (computerMove) {
        case "paper":
          setPlayerScore((prevScore) => prevScore + 1);
          result = [...playerResult, "win"];
          setPlayerResult(result);
          break;
        case "rock":
          setCpuScore((prevScore) => prevScore + 1);
          result = [...playerResult, "lose"];
          setPlayerResult(result);
          break;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Rock, Paper, Scissors</title>
        <meta
          name="description"
          content="Play Rock, Paper, Scissors against the computer!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="" />
      </Head>
      <main className={classes.body}>
        {!showRules && (
          <>
            <section className={classes.header}>
              <div className={classes.title}>
                <Image
                  width={200}
                  height={100}
                  className={classes.titleIcon}
                  src="/logo.svg"
                  alt=""
                />
              </div>
              <div className={classes.scoreboard}>
                <div className={classes.scoreboardContent}>
                  <p className={classes.scoreHeader}>
                    <strong>SCORE</strong>
                  </p>
                  <div className={classes.scores}>
                    <p>Player: {playerScore}</p>
                    <p>Computer: {cpuScore}</p>
                  </div>
                </div>
              </div>
            </section>
            {!showingMoves && (
              <section className={classes.buttonSection}>
                <div className={classes.buttonSub1}>
                  <button
                    onClick={handleButtonClick}
                    value="paper"
                    className={classes.moveButton}
                  >
                    <PaperIcon onClick={handleIconClick} />
                  </button>
                  <button
                    onClick={handleButtonClick}
                    value="scissors"
                    className={classes.moveButton}
                  >
                    <ScissorsIcon onClick={handleIconClick} />
                  </button>
                </div>
                <div className={classes.buttonSub2}>
                  <button
                    className={classes.moveButton}
                    onClick={handleButtonClick}
                    value="rock"
                  >
                    <RockIcon onClick={handleIconClick} />
                  </button>
                </div>
              </section>
            )}
            {showingMoves && (
              <section className={classes.showMovesSection}>
                <div>
                  <p>YOU PICKED</p>
                  {userMoves[userMoves.length - 1] === "rock" ? (
                    <RockIcon onClick={() => {}} />
                  ) : userMoves[userMoves.length - 1] === "paper" ? (
                    <PaperIcon onClick={() => {}} />
                  ) : (
                    <ScissorsIcon onClick={() => {}} />
                  )}
                </div>
                <div>
                  <p className={classes.resultMessage}>{`You ${playerResult[
                    playerResult.length - 1
                  ].toUpperCase()}`}</p>
                  <button
                    onClick={() => setShowingMoves(false)}
                    className={classes.playAgainBtn}
                  >
                    Play Again
                  </button>
                </div>
                <div>
                  <p>THE HOUSE PICKED</p>
                  {comMoves[comMoves.length - 1] === "rock" ? (
                    <RockIcon onClick={() => {}} />
                  ) : comMoves[comMoves.length - 1] === "paper" ? (
                    <PaperIcon onClick={() => {}} />
                  ) : (
                    <ScissorsIcon onClick={() => {}} />
                  )}
                </div>
              </section>
            )}
            <button
              onClick={() => setShowRules(true)}
              className={classes.rulesButton}
            >
              RULES
            </button>
          </>
        )}

        {showRules && (
          <section className={classes.rulesDisplay}>
            <h1 className={classes.rulesHeader}>RULES</h1>
            <Image
              width={300}
              height={250}
              className={classes.rulesBody}
              src="image-rules.svg"
              alt=""
            />
            <button
              onClick={() => setShowRules(false)}
              className={classes.rulesCloseBtn}
            >
              <Image width={50} height={50} src="icon-close.svg" alt="" />
            </button>
          </section>
        )}
      </main>
    </>
  );
}
