import Head from "next/head";
import classes from "../styles/Home.module.css";
import { useState, MouseEvent, useRef, useEffect, useCallback } from "react";
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
  const [playerIconVisible, setPlayerIconVisible] = useState<boolean>(false);
  const [cpuIconVisible, setCPUIconVisible] = useState<boolean>(false);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const computerMoveDict = ["rock", "paper", "scissors"];

  const handleResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (showingMoves) {
      setTimeout(() => {
        setPlayerIconVisible(true);
        setTimeout(() => {
          setCPUIconVisible(true);
          setTimeout(() => {
            setResultVisible(true);
            if (playerResult[playerResult.length - 1] === "win") {
              setPlayerScore((prevScore) => prevScore + 1);
            } else if (playerResult[playerResult.length - 1] === "lose") {
              setCpuScore((prevScore) => prevScore + 1);
            }
          }, 1000);
        }, 1000);
      }, 1000);
    }
  }, [showingMoves]);

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
          result = [...playerResult, "lose"];
          setPlayerResult(result);
          break;
        case "scissors":
          result = [...playerResult, "win"];
          setPlayerResult(result);
          break;
      }
    } else if (playerMove === "paper") {
      let result;
      switch (computerMove) {
        case "rock":
          result = [...playerResult, "win"];
          setPlayerResult(result);
          break;
        case "scissors":
          result = [...playerResult, "lose"];
          setPlayerResult(result);
          break;
      }
    } else {
      let result;
      switch (computerMove) {
        case "paper":
          result = [...playerResult, "win"];
          setPlayerResult(result);
          break;
        case "rock":
          result = [...playerResult, "lose"];
          setPlayerResult(result);
          break;
      }
    }
  };

  const resultDiv = playerResult.length && (
    <div className={classes.showResult}>
      <p aria-label="Game result" className={classes.resultMessage}>
        {`You ${playerResult[playerResult.length - 1].toUpperCase()}`}
      </p>
      <button
        aria-label="Play again!"
        tabIndex={0}
        onClick={() => {
          setShowingMoves(false),
            setPlayerIconVisible(false),
            setCPUIconVisible(false);
          setResultVisible(false);
        }}
        className={classes.playAgainBtn}
      >
        Play Again
      </button>
    </div>
  );

  return (
    <>
      <Head>
        <title>Rock, Paper, Scissors</title>
        <meta
          name="description"
          content="Play Rock, Paper, Scissors against the computer!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main aria-label="Content" className={classes.body}>
        {!showRules && (
          <>
            <section
              aria-label="Logo and Scoreboard"
              className={classes.header}
            >
              <div className={classes.title}>
                <Image
                  width={200}
                  height={100}
                  className={classes.titleIcon}
                  src="/logo.svg"
                  alt="Rock, Paper, Scissors Logo"
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
                <div className={classes.showPlayerMove}>
                  <p className={classes.playerMoveHeader}>YOU PICKED</p>
                  {!playerIconVisible && (
                    <div className={classes.playerIconPlaceholder}></div>
                  )}
                  {playerIconVisible && (
                    <div
                      className={`
                        ${
                          playerResult[playerResult.length - 1] === "win" &&
                          resultVisible
                            ? classes.winnerIcon
                            : ""
                        } ${classes.moveIcon}
                      `}
                    >
                      {userMoves[userMoves.length - 1] === "rock" ? (
                        <RockIcon onClick={() => {}} />
                      ) : userMoves[userMoves.length - 1] === "paper" ? (
                        <PaperIcon onClick={() => {}} />
                      ) : (
                        <ScissorsIcon onClick={() => {}} />
                      )}
                    </div>
                  )}
                </div>
                {resultVisible && (windowSize.width > 500 ? resultDiv : <></>)}
                <div className={classes.showCpuMove}>
                  <p className={classes.cpuMoveHeader}>THE HOUSE PICKED</p>
                  {!cpuIconVisible && (
                    <div className={classes.cpuIconPlaceholder}></div>
                  )}
                  {cpuIconVisible && (
                    <div
                      className={`
                      ${
                        playerResult[playerResult.length - 1] === "lose" &&
                        resultVisible
                          ? classes.winnerIcon
                          : ""
                      } ${classes.moveIcon}
                    `}
                    >
                      {comMoves[comMoves.length - 1] === "rock" ? (
                        <RockIcon onClick={() => {}} />
                      ) : comMoves[comMoves.length - 1] === "paper" ? (
                        <PaperIcon onClick={() => {}} />
                      ) : (
                        <ScissorsIcon onClick={() => {}} />
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}
            {resultVisible && (windowSize.width <= 500 ? resultDiv : <></>)}
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
