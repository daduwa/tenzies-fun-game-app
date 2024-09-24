import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "orange " : "white",
  };
  return (
    <div
      onClick={props.holdDice}
      className="die--container rounded-lg bg-zinc-50 shadow-md p-5 hover:cursor-pointer"
      style={styles}
    >
      <h1 className="text-[1.4rem] font-bold">{props.value}</h1>
    </div>
  );
}

export default Die;
