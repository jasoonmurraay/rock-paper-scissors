import Image from "next/image";
import { MouseEvent } from "react";
import classes from "../styles/RockIcon.module.css";
import { IconPropType } from "@/interfaces";

const RockIcon = (props: IconPropType) => {
  const clickHandler = (event: MouseEvent<HTMLImageElement>) => {
    props.onClick(event);
  };
  return (
    <div className={classes.rockButton}>
      <Image
        onClick={clickHandler}
        width={50}
        height={50}
        className={classes.rockIcon}
        src="/icon-rock.svg"
        alt="Select rock"
      />
    </div>
  );
};

export default RockIcon;
