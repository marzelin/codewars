const solvePuzzle = (rawClues: number[]) => {
  const clues = rawClues.reduce(processClues, [])
  let scrapers = initScrapers()
  clues.forEach( (clue) => {
    scrapers = initialAction(clue, scrapers)
  })
  while (!allHeightsFound(scrapers)) {
    clues.forEach( (clue) => {
      scrapers = advancedAction(clue, scrapers)
    })
  }
  return scrapers.map(height)
}

const height = (scrapers: Iscraper[]) => scrapers.map( (scraper) => scraper.height )

const allHeightsFound = (scrapers: Iscraper[][]) =>
  scrapers.every( (scraperAlley) =>
    scraperAlley.every( (scraper) => scraper.height != null )
  )

const initialAction = ({ visibleScrapers, alleyNo, side }: Iclue, scrapers: Iscraper[][]) => {
  if (initalActions[visibleScrapers]) {
    scrapers = initalActions[visibleScrapers](side, alleyNo, scrapers)
  }
  return scrapers
}

const scraperPosition = (side: Iclue['side'], alleyNo: Iclue['alleyNo']) => (scraperNo: number) => {
  switch (side) {
    case 'top': return [scraperNo, alleyNo]
    case 'right': return [alleyNo, 3 - scraperNo]
    case 'bottom': return [3 -scraperNo, 3 - alleyNo]
    case 'left': return [3 - alleyNo, scraperNo]
  }
}

const assignHeight = ( [row, col]: number[], height: number, scrapers: Iscraper[][]) => {
  if (scrapers[row][col].height) { return scrapers }
  scrapers[row][col] = {
    height,
    possibleHeights: new Set([height])
  }
  for (let i = 0; i < 4; i++) {
    scrapers = forbidHeight([i, col], height, scrapers)
    scrapers = forbidHeight([row, i], height, scrapers)
  }
  return scrapers
}

const forbidHeight = ( [row, col]: number[], height: number, scrapers: Iscraper[][]) => {
  if (scrapers[row][col].height) { return scrapers }
    scrapers[row][col].possibleHeights.delete(height)
  if (scrapers[row][col].possibleHeights.size === 1) {
    const height = first(scrapers[row][col].possibleHeights)
    scrapers = assignHeight([row, col], height, scrapers)
  }
  return scrapers
}

const first = (set: Set<any>) => set.values().next().value

const initalActions: {[visibleScrapers: number]: (side: Iclue['side'], alleyNo: Iclue['alleyNo'], scrapers: Iscraper[][]) => Iscraper[][]} = {
  1: (side, alleyNo, scrapers) => {
    const scraper = scraperPosition(side, alleyNo)
    scrapers = assignHeight(scraper(0), 4, scrapers)
    return scrapers
  },
  2: (side, alleyNo, scrapers) => {
    const scraper = scraperPosition(side, alleyNo)
    scrapers = forbidHeight(scraper(0), 4, scrapers)
    scrapers = forbidHeight(scraper(1), 3, scrapers)
    return scrapers
  },
  3: (side, alleyNo, scrapers) => {
    const scraper = scraperPosition(side, alleyNo)
    scrapers = forbidHeight(scraper(0), 4, scrapers)
    scrapers = forbidHeight(scraper(0), 3, scrapers)
    scrapers = forbidHeight(scraper(1), 4, scrapers)
    return scrapers
  },
  4: (side, alleyNo, scrapers) => {
    const scraper = scraperPosition(side, alleyNo)
    scrapers = assignHeight(scraper(0), 1, scrapers)
    scrapers = assignHeight(scraper(1), 2, scrapers)
    scrapers = assignHeight(scraper(2), 3, scrapers)
    scrapers = assignHeight(scraper(3), 4, scrapers)
    return scrapers
  }
}

const advancedAction = ({ visibleScrapers, alleyNo, side }: Iclue, scrapers: Iscraper[][]) => {
  if (advancedActions[visibleScrapers]) {
    scrapers = advancedActions[visibleScrapers](side, alleyNo, scrapers)
  }
  return scrapers
}

const advancedActions: {[visibleScrapers: number]: (side: Iclue['side'], alleyNo: Iclue['alleyNo'], scrapers: Iscraper[][]) => Iscraper[][]} = {
  2: (side, alleyNo, scrapers) => {
    const scraper = scraperPosition(side, alleyNo)
    if (hasHeight(scraper(0), 1, scrapers)) {
      scrapers = assignHeight(scraper(1), 4, scrapers)
    }
    if (hasHeightForbidden(scraper(1), 4, scrapers)) {
      scrapers = forbidHeight(scraper(0), 1, scrapers)
    }
    if (hasHeight(scraper(3), 4, scrapers)) {
      scrapers = assignHeight(scraper(0), 3, scrapers)
    }
    if (hasHeightForbidden(scraper(0), 3, scrapers)) {
      scrapers = forbidHeight(scraper(3), 4, scrapers)
    }
    if (hasHeight(scraper(0), 2, scrapers)
       && hasHeight(scraper(2), 4, scrapers)) {
      scrapers = assignHeight(scraper(1), 1, scrapers)
      scrapers = assignHeight(scraper(3), 3, scrapers)
    }
    return scrapers
  },
  3: (side, alleyNo, scrapers) => {
    const scraper = scraperPosition(side, alleyNo)
    if (hasHeight(scraper(2), 3, scrapers)) {
      scrapers = assignHeight(scraper(0), 2, scrapers)
      scrapers = assignHeight(scraper(1), 1, scrapers)
      scrapers = assignHeight(scraper(3), 4, scrapers)
    }
    return scrapers
  }
}

const hasHeight = ([row, col]: number[], height: number, scrapers: Iscraper[][]) =>
  scrapers[row][col].height === height

const hasHeightForbidden = ([row, col]: number[], height: number, scrapers: Iscraper[][]) =>
  !scrapers[row][col].possibleHeights.has(height)

interface Iclue {
  side: 'top' | 'right' | 'bottom' | 'left'
  alleyNo: number
  visibleScrapers: number
}

interface Iscraper {
  possibleHeights: Set<number>
  height?: number
}

const processClues = (
  clues: Iclue[],
  value: number,
  index: number): Iclue[] => value
  ? [
    ...clues,
    {
      side: side(index),
      alleyNo: index % 4,
      visibleScrapers: value
    }
  ]
  : clues

const side = (index: number) => {
  if (index < 4) { return 'top' }
  else if (index < 8) { return 'right' }
  else if (index < 12) { return 'bottom' }
  else { return 'left' }

}

const initScrapers = () => {
  const scrapers: Iscraper[][] = []
  for (let i = 0; i < 4; i++) {
    scrapers[i] = []
    for (let j = 0; j < 4; j++) {
      scrapers[i][j] = {
        possibleHeights: new Set([1, 2, 3, 4])
      }
    }
  }
  return scrapers
}

export {
  allHeightsFound,
  assignHeight, 
  first,
  forbidHeight,
  height,
  initScrapers,
  processClues,
  scraperPosition,
  solvePuzzle,
  Iclue
}