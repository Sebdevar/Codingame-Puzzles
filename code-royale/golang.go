package main

import "fmt"

type coordinate struct {
	x, y int
}

type site struct {
	id       int
	position coordinate
	radius   int

	structureType int
	owner         int

	// Barracks
	numberOfTurnsLeftBeforeNextTraining int
	creepType                           int
}

type unit struct {
	position coordinate
	owner    int
	unitType int
	health   int
}

type owner struct {
	sitesByType   map[int][]*site
	unitsByType   map[int][]*unit
	gold          int
	touchedSiteId int
}

type gameField struct {
	sitesById map[int]*site
}

func main() {
	var numberOfSites int
	_, _ = fmt.Scan(&numberOfSites)

	gameField := &gameField{
		sitesById: make(map[int]*site, numberOfSites),
	}

	for i := 0; i < numberOfSites; i++ {
		site := &site{}
		_, _ = fmt.Scan(&site.id, &site.position.x, &site.position.y, &site.radius)

		gameField.sitesById[site.id] = site
	}

	player := &owner{}
	enemy := &owner{}
	var commandQueue string

	for {
		// touchedSite: -1 if none
		_, _ = fmt.Scan(&player.gold, &player.touchedSiteId)

		player.sitesByType = make(map[int][]*site)
		enemy.sitesByType = make(map[int][]*site)
		neutral

		for i := 0; i < numberOfSites; i++ {
			// ignore1: used in future leagues
			// ignore2: used in future leagues
			// structureType: -1 = No structure, 2 = Barracks
			// owner: -1 = No structure, 0 = Friendly, 1 = Enemy
			var siteId, ignore1, ignore2, structureType, owner, param1, param2 int
			_, _ = fmt.Scan(&siteId, &ignore1, &ignore2, &structureType, &owner, &param1, &param2)

			switch owner {
			case -1:
				neutral

			}
		}

		var numberOfUnits int
		_, _ = fmt.Scan(&numberOfUnits)

		gameField.unitsByPlayer = make(map[int][]*unit)
		for i := 0; i < numberOfUnits; i++ {
			// unitType: -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
			newUnit := &unit{}
			_, _ = fmt.Scan(&newUnit.position.x, &newUnit.position.y, &newUnit.owner, &newUnit.unitType, &newUnit.health)
			gameField.unitsByPlayer[newUnit.owner] = append(gameField.unitsByPlayer[newUnit.owner], newUnit)
		}

		fmt.Println("WAIT")
		fmt.Println("TRAIN")
	}
}
