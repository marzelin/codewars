import { expect } from 'chai'
import {
  allHeightsFound,
  assignHeight,
  first,
  forbidHeight,
  height,
  initScrapers,
  processClues,
  scraperPosition,
  solvePuzzle,
  Iclue } from './4_By_4_Skyscrapers'

describe(`processClues`, function () {
  it(`should return clues without changing if value is 0`, function () {
    const clues: Iclue[] = []
    const value = 0
    const index = 0
    processClues(clues, value, index).should.equal(clues)
  })
  it(`should return top clue for indexes less than 4`, function () {
    const clues: Iclue[] = []
    const value = 1
    const index = 1
    const expected: Iclue[] = [{
      side: 'top',
      alleyNo: 1,
      visibleScrapers: 1
    }]
    processClues(clues, value, index).should.deep.equal(expected)
  })
  it(`should return right clue for indexes between 4 and 8`, function () {
    const clues: Iclue[] = []
    const value = 2
    const index = 5
    const expected: Iclue[] = [{
      side: 'right',
      alleyNo: 1,
      visibleScrapers: 2
    }]
    processClues(clues, value, index).should.deep.equal(expected)
  })
  it(`should return bottom clue for indexes between 8 and 12`, function () {
    const clues: Iclue[] = []
    const value = 3
    const index = 8
    const expected: Iclue[] = [{
      side: 'bottom',
      alleyNo: 0,
      visibleScrapers: 3
    }]
    processClues(clues, value, index).should.deep.equal(expected)
  })
  it(`should return left clue for indexes over 12`, function () {
    const clues: Iclue[] = [{
      side: 'bottom',
      alleyNo: 0,
      visibleScrapers: 3
    }]
    const value = 2
    const index = 15
    const expected: Iclue[] = [{
      side: 'bottom',
      alleyNo: 0,
      visibleScrapers: 3
    }, {
      side: 'left',
      alleyNo: 3,
      visibleScrapers: 2
    }]
    processClues(clues, value, index).should.deep.equal(expected)
  })
  it(`should reduce input clues to suitable format`, function () {
    const input = [0, 0, 1, 2,
                   0, 2, 0, 0,
            		   0, 3, 0, 0,
            		   0, 1, 0, 0]
    const expected: Iclue[] = [
      {
        side: 'top',
        alleyNo: 2,
        visibleScrapers: 1
      },
      {
        side: 'top',
        alleyNo: 3,
        visibleScrapers: 2
      },
      {
        side: 'right',
        alleyNo: 1,
        visibleScrapers: 2
      },
      {
        side: 'bottom',
        alleyNo: 1,
        visibleScrapers: 3
      },{
        side: 'left',
        alleyNo: 1,
        visibleScrapers: 1
      }
    ]
    input.reduce(processClues, []).should.deep.equal(expected)
  })
})

describe(`initScrapers`, function () {
  it(`should have 4 rows and 4 columns`, function () {
    const output = initScrapers()
    output.should.have.length(4)
    output.forEach( (column) => {
      column.should.have.length(4)
      column.forEach( (scraper) => {
        scraper.should.haveOwnProperty('possibleHeights')
        scraper['possibleHeights'].should.be.instanceof(Set)
        scraper['possibleHeights'].size.should.equal(4)
        scraper['possibleHeights'].has(1).should.be.true
        scraper['possibleHeights'].has(2).should.be.true
        scraper['possibleHeights'].has(3).should.be.true
        scraper['possibleHeights'].has(4).should.be.true
      })
    })
  })
})

describe(`height`, function () {
  it(`should pluck height from array of objects`, function () {
    const input: any = [{ height: 2}, {height: 3}]
    height(input).should.deep.equal([2, 3])
  })
})

describe(`allHeightsFound`, function () {
  it(`should return false if some heights are still missing`, function () {
    const input: any = [
      [{height: 3}, {}, {height: 1}],
      [{height: 3}, {height: 4}, {}]
    ]
    allHeightsFound(input).should.be.false
  })
  it(`should return true if all heights have been found`, function () {
    const input: any = [
      [{height: 3}, {height: 2}, {height: 1}],
      [{height: 3}, {height: 4}, {height: 2}]
    ]
    allHeightsFound(input).should.be.true
  })
})

describe(`scraperPosition`, function () {
  it(`should return proper position for top side`, function () {
    const side = 'top'
    const alleyNo = 1
    const scraperNo = 0
    const expected = [0, 1]
    scraperPosition(side, alleyNo)(scraperNo).should.deep.equal(expected)
  })
  it(`should return proper position for right side`, function () {
    const side = 'right'
    const alleyNo = 2
    const scraperNo = 1
    const expected = [2, 2]
    scraperPosition(side, alleyNo)(scraperNo).should.deep.equal(expected)
  })
  it(`should return proper position for bottom side`, function () {
    const side = 'bottom'
    const alleyNo = 0
    const scraperNo = 3
    const expected = [0, 3]
    scraperPosition(side, alleyNo)(scraperNo).should.deep.equal(expected)
  })
  it(`should return proper position for left side`, function () {
    const side = 'left'
    const alleyNo = 3
    const scraperNo = 0
    const expected = [0, 0]
    scraperPosition(side, alleyNo)(scraperNo).should.deep.equal(expected)
  })
})

describe(`assignHeight`, function () {
  it(`should assign height to a given scraper`, function () {
    const scrapers = initScrapers()
    const output = assignHeight([2, 3], 4, scrapers)
    output[2].forEach( (scraper, i) => {
      if (i === 3) {
        return expect(scraper.height).to.be.equal(4)
      }
      scraper.possibleHeights.has(4).should.be.false
    })
    for (let i = 0; i < 4; i++) {
      const scraper = output[i][3]
      if (i === 2) {
        expect(scraper.height).to.be.equal(4)
        continue
      } 
      scraper.possibleHeights.has(4).should.be.false
    }
  })
})

describe(`forbidHeight`, function () {
  it(`should forbid a given height as a possible height of a scraper`, function () {
    const scrapers = initScrapers()
    const output = forbidHeight([2, 1], 2, scrapers)
    output[2][1].possibleHeights.has(2).should.be.false
    output[2][1].possibleHeights.has(1).should.be.true
  })
})

describe(`first`, function () {
  it(`should return first element from the set`, function () {
    const set = new Set(['first', 'second', 'third'])
    first(set).should.equal('first')
  })
})

describe(`solvePuzzle`, function () {
  it(`should solve easy puzzle`, function () {
    const rawClues = [2, 2, 1, 3,
                      2, 2, 3, 1,
                      1, 2, 2, 3,
                      3, 2, 1, 3]
    const expected = [[1, 3, 4, 2],
                      [4, 2, 1, 3],
                      [3, 4, 2, 1],
                      [2, 1, 3, 4]]
                      
    solvePuzzle(rawClues).should.deep.equal(expected)
  })
  it(`should solve advanced puzzle`, function () {
    const rawClues = [0, 0, 1, 2,
                      0, 2, 0, 0,
                      0, 3, 0, 0,
                      0, 1, 0, 0]
    const expected = [[2, 1, 4, 3],
                      [3, 4, 1, 2],
                      [4, 2, 3, 1],
                      [1, 3, 2, 4]]
    solvePuzzle(rawClues).should.deep.equal(expected)
  })
})