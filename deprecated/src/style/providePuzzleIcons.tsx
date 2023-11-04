import React from "react";

import PuzzleIcon1 from "../assets/svgs/puzzle_pieces/1.svg"
import PuzzleIcon2 from "../assets/svgs/puzzle_pieces/2.svg"
import PuzzleIcon3 from "../assets/svgs/puzzle_pieces/3.svg"
import PuzzleIcon4 from "../assets/svgs/puzzle_pieces/4.svg"
import PuzzleIcon5 from "../assets/svgs/puzzle_pieces/5.svg"
import PuzzleIcon6 from "../assets/svgs/puzzle_pieces/6.svg"
import PuzzleIcon7 from "../assets/svgs/puzzle_pieces/7.svg"
import PuzzleIcon8 from "../assets/svgs/puzzle_pieces/8.svg"
import PuzzleIcon9 from "../assets/svgs/puzzle_pieces/9.svg"
import PuzzleIcon10 from "../assets/svgs/puzzle_pieces/10.svg"
import PuzzleIcon11 from "../assets/svgs/puzzle_pieces/11.svg"
import PuzzleIcon12 from "../assets/svgs/puzzle_pieces/12.svg"
import PuzzleIcon13 from "../assets/svgs/puzzle_pieces/13.svg"
import PuzzleIcon14 from "../assets/svgs/puzzle_pieces/14.svg"
import PuzzleIcon15 from "../assets/svgs/puzzle_pieces/15.svg"
import PuzzleIcon16 from "../assets/svgs/puzzle_pieces/16.svg"
import PuzzleIcon17 from "../assets/svgs/puzzle_pieces/17.svg"
import PuzzleIcon18 from "../assets/svgs/puzzle_pieces/18.svg"

const puzzleIcons = [
    PuzzleIcon1,
    PuzzleIcon2,
    PuzzleIcon3,
    PuzzleIcon4,
    PuzzleIcon5,
    PuzzleIcon6,
    PuzzleIcon7,
    PuzzleIcon8,
    PuzzleIcon9,
    PuzzleIcon10,
    PuzzleIcon11,
    PuzzleIcon12,
    PuzzleIcon13,
    PuzzleIcon14,
    PuzzleIcon15,
    PuzzleIcon16,
    PuzzleIcon17,
    PuzzleIcon18,
];

export const PuzzleIcon = () => {
    const randomPuzzlePiece = puzzleIcons[Math.floor(Math.random() * puzzleIcons.length)];

    return (
        <img src={randomPuzzlePiece} alt="Puzzle icon" style={{width: "20px", height: "20px", filter: "grayscale(100%) contrast(25%)"}}/>

    )
}

