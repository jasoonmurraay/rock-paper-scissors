import Image from "next/image";
import { MouseEvent } from "react";
import classes from "../styles/PaperIcon.module.css";
import { IconPropType } from "@/interfaces";

const PaperIcon = (props: IconPropType) => {
  const clickHandler = (event: MouseEvent<HTMLImageElement>) => {
    props.onClick(event);
  };
  return (
    <div className={classes.paperButton}>
      <Image
        onClick={clickHandler}
        width={50}
        height={50}
        className={classes.paperIcon}
        src="/icon-paper.svg"
        alt="Select paper"
      />
    </div>
  );
};

export default PaperIcon;
