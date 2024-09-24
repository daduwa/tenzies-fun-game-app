import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "orange " : "white",
  };
  return (
    <div
      onClick={props.holdDice}
      className="die--container rounded-lg bg-zinc-50 shadow-md w-[50px] h-[50px] leading-none items-center justify-center flex hover:cursor-pointer border-black border-2"
      style={styles}
    >
      <h1 className="text-[1.4rem] font-bold ">{props.value}</h1>
    </div>
  );
}

export default Die;
