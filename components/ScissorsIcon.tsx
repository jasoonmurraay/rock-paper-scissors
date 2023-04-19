import Image from "next/image";
import { MouseEvent } from "react";
import classes from "../styles/ScissorsIcon.module.css";
import { IconPropType } from "@/interfaces";

const ScissorsIcon = (props: IconPropType) => {
  const clickHandler = (event: MouseEvent<HTMLImageElement>) => {
    props.onClick(event);
  };
  return (
    <div className={classes.scissorsButton}>
      <Image
        onClick={clickHandler}
        width={50}
        height={50}
        className={classes.scissorsIcon}
        src="/icon-scissors.svg"
        alt="Select scissors"
      />
    </div>
  );
};

export default ScissorsIcon;
