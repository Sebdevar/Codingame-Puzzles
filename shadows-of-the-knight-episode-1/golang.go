package main

import (
	"fmt"
	"math"
	"os"
)

type coordinate struct {
	x, y int
}

type area struct {
	minX, maxX, minY, maxY int
}

var directionIncrements = map[string]coordinate{
	"U":  {0, -1},
	"D":  {0, 1},
	"L":  {-1, 0},
	"R":  {1, 0},
	"UR": {1, -1},
	"DR": {1, 1},
	"UL": {-1, -1},
	"DL": {-1, 1},
}

type batman struct {
	currentPosition coordinate
	searchLimits    area
}

func (batman *batman) getNextJumpX(xIncrement int) int {
	switch xIncrement {
	case 0:
		batman.searchLimits.minX = batman.currentPosition.x
		batman.searchLimits.maxX = batman.currentPosition.x
		return batman.currentPosition.x
	case 1:
		batman.searchLimits.minX = batman.currentPosition.x
		return int(math.Ceil(float64((batman.searchLimits.maxX-batman.currentPosition.x)/2))) + batman.currentPosition.x
	case -1:
		batman.searchLimits.maxX = batman.currentPosition.x
		return (batman.currentPosition.x-batman.searchLimits.minX)/2 + batman.searchLimits.minX
	default:
		_, _ = fmt.Fprintln(os.Stderr, "Invalid increment received")
		return batman.currentPosition.x
	}
}

func (batman *batman) getNextJumpY(yIncrement int) int {
	switch yIncrement {
	case 0:
		batman.searchLimits.minY = batman.currentPosition.y
		batman.searchLimits.maxY = batman.currentPosition.y
		return batman.currentPosition.x
	case 1:
		batman.searchLimits.minY = batman.currentPosition.y
		return int(math.Ceil(float64((batman.searchLimits.maxY-batman.currentPosition.y)/2))) + batman.currentPosition.y
	case -1:
		batman.searchLimits.maxY = batman.currentPosition.y
		return (batman.currentPosition.y-batman.searchLimits.minY)/2 + batman.searchLimits.minY
	default:
		_, _ = fmt.Fprintln(os.Stderr, "Invalid increment received")
		return batman.currentPosition.y
	}
}

func (batman *batman) jumpToNextCoordinate(bombDirection string) {
	nextJumpIncrement := directionIncrements[bombDirection]
	nextJump := &coordinate{}
	nextJump.x = batman.getNextJumpX(nextJumpIncrement.x)
	nextJump.y = batman.getNextJumpY(nextJumpIncrement.y)
	_, _ = fmt.Println(nextJump.x, nextJump.y)
	batman.currentPosition = *nextJump
}

func main() {
	var currentPosition = coordinate{}
	var searchLimits = area{minX: 0, minY: 0}
	_, _ = fmt.Scan(&searchLimits.maxX, &searchLimits.maxY)
	var N int
	_, _ = fmt.Scan(&N) // maximum number of turns before game over. We don't need it.
	_, _ = fmt.Scan(&currentPosition.x, &currentPosition.y)
	var batman = &batman{currentPosition, searchLimits}

	for {
		var bombDirection string
		_, _ = fmt.Scan(&bombDirection)
		batman.jumpToNextCoordinate(bombDirection)
	}
}
