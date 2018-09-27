String.prototype.hashCode = function() {
    var hash = 0, i, chr
    if (this.length === 0) return hash
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}

class Wordscape {

    constructor(words) {
        this.CountForPossibility = 0
        this.EMPTYCHAR = ' '
        this.WORDS = words
        this.Li = []
        this.coordList = []
        this.WordsCoordinatesList = []
        this.Columns = 37
        this.Rows = 37
        this.outputCount = 0
        this.WordList = words.sort((a, b) => {
            return -a.length + b.length
        })
        this.draw()
        this.placeWord(this.WordList[0].word, 17, 15, false)
        this.generate()
        this.showResult()
    }

    showResult() {
        if (this.Li.length) {
            this.Lmin = []
            this.Lfinall = []

            //get min area
            this.Li.sort((a, b) => {
                return -a.area + b.area
            })
            let minArea = this.Li[this.Li.length - 1].area
            for (let i = 0; i < this.Li.length; i++) {
                if (this.Li[i].area == minArea) this.Lmin.push(this.Li[i])
            }

            //get unique hash
            let hashIndex = 0
            this.Lmin.sort((a, b) => {
                return -a.hash + b.hash
            })

            for (let i = 0; i < this.Lmin.length; i++) {

                if (this.Lmin[i].hash !== hashIndex) {
                    this.Lfinall.push(this.Lmin[i])
                    hashIndex = this.Lmin[i].hash
                }
            }

            console.log(this.Li.length, this.Lmin.length, this.Lfinall.length)

            let biggestIndex = this.Lfinall.length > 6 ? 6 : this.Lfinall.length
            for (let i = 0; i < biggestIndex; i++) {
                if (this.outputCount >= 5)
                    continue;
                console.log(`${this.outputCount}  [index: ${i + 1}] [row: ${this.Lfinall[i].row}] [colmun: ${this.Lfinall[i].colmun}] [subtraction: ${this.Lfinall[i].subtraction}] [area: ${this.Lfinall[i].area}] [hash: ${this.Lfinall[i].hash}]`)
                for (let a = 0; a < this.Lfinall[i].grid.length; a++) {
                    let b = (this.Lfinall[i].grid[a].toString())
                    console.log(b)
                }
                this.outputCount += 1
            }
        }
        console.log("Not possible")
        return -1
    }


    draw() {
        this.grid = []
        for (let i = 0; i < this.Rows; i++) {
            this.grid.push([])
        }
        for (let x = 0; x < this.Rows; x++) {
            for (let y = 0; y < this.Columns; y++) {
                this.grid[x][y] = this.EMPTYCHAR
            }
        }
    }

    status(current) {
        let row = []
        let column = []
        for (let i = 0; i < this.Columns; i++) {
            for (let j = 0; j < this.Rows; j++) {
                if (current[j][i] !== this.EMPTYCHAR) row[row.length] = j
                if (current[i][j] !== this.EMPTYCHAR) column[column.length] = j
            }
        }
        let a = row.sort((a, b) => {
            return -a + b
        })
        let b = column.sort((a, b) => {
            return -a + b
        })

        let testGrid = ""
        for (let i = 0; i < current.length; i++) {
            testGrid += current[i].toString()
        }

        let A = 1 + a[0] - a[a.length - 1]
        let B = 1 + b[0] - b[b.length - 1]
        let C = A - B
        let D = B - A
        let E = A * B
        let F = testGrid.hashCode()

        let objGrid = {
            "row": A,
            "colmun": B,
            "subtraction": C > D ? C : D,
            "area": A * B,
            "grid": current,
            "hash": F
        }
        return objGrid
    }

    generate() {
        let fitScore = 0
        let first = []
        let next = []
        let finall = []
        let flag = false
        let L = []
        let actionCount = 0
        let maxIndex = this.maxIndex
        let action = (ix, top, i) => {
            if (i !== ix) ++actionCount
            this.getCoords(this.WordList[ix].word)
            if (this.coordList[0]) {
                for (let index = 0; index < this.coordList.length; index++) {
                    fitScore = this.checkFitScore(this.WordList[ix].word, this.coordList[index].x, this.coordList[index].y, this.coordList[index].vertical)
                    if (fitScore === 1) {
                        first = JSON.parse(JSON.stringify(this.grid))
                        this.placeWord(this.WordList[ix].word, this.coordList[index].x, this.coordList[index].y, this.coordList[index].vertical)
                        let current = JSON.parse(JSON.stringify(this.grid))
                        if (ix === this.WordList.length - 1) {
                            let W = this.status(current)
                            if (W !== undefined) {
                                L.push(W)
                                    // console.log(W.area)
                                    // for (let a = 0; a < W.grid.length; a++) {
                                    //     let b = (W.grid[a].toString())
                                    //     console.log(b)
                                    //}
                            }
                            for (let i = 0; i < current.length; i++) {}
                        }
                        if (flag) {
                            finall.push(current)
                        } else {
                            next.push(current)
                        }
                        this.grid = JSON.parse(JSON.stringify(first))
                    }
                    top = top < fitScore ? fitScore : top
                }
            }
        }

        //when there is still words left  直到所有单词已被操作
        while (this.WordsCoordinatesList.length !== this.WordList.length) {
            let top = 0
            if (L.length > 100) {
                return
            }
            for (let ix = 1; ix < this.WordList.length; ix++) {
                if (next.length > 0) {
                    flag = true
                    for (let i = 0; i < next.length; i++) {
                        this.grid = JSON.parse(JSON.stringify(next[i]))
                        action(ix, top, i)
                    }
                    next = []
                    flag = false
                } else
                if (finall.length > 0) {
                    flag = false
                    for (let i = 0; i < finall.length; i++) {
                        this.grid = JSON.parse(JSON.stringify(finall[i]))
                        action(ix, top, i)
                    }
                    finall = []
                    flag = true
                } else action(ix, top)
            }
            if (top !== 1) break
        }
        //get min grid
        if (L.length > 0) {
            L.sort((a, b) => {
                return -a.area + b.area
            })
            let minArea = L[L.length - 1].area
            for (let i = 0; i < L.length; i++) {
                if (L[i].area == minArea) this.Li.push(L[i])
            }
        }
    }

    //search for potential cross placement locations  查找所有可放置坐标
    getCoords(word) {
        let char = ''
        let coordIndex = 0
        //cycle through each character of the word  遍历单词
        for (let i = 0; i < word.length; i++) {
            for (let x = 0; x < this.Rows; x++) {
                for (let y = 0; y < this.Columns; y++) {
                    char = word[i]

                    //check for match  检查是否匹配
                    if (this.grid[x][y] === char) {
                        //would fit vertically?  可否横向放置
                        if (x - i + 1 > 0 && x - i + word.length - 1 < this.Rows) {
                            this.coordList[coordIndex] = {}
                            this.coordList[coordIndex].x = x - i
                            this.coordList[coordIndex].y = y
                            this.coordList[coordIndex].score = 0
                            this.coordList[coordIndex].vertical = true
                            coordIndex++
                        }
                        //would fit horizontally?  可否纵向放置
                        if (y - i + 1 > 0 && y - i + word.length - 1 < this.Columns) {
                            this.coordList[coordIndex] = {}
                            this.coordList[coordIndex].x = x
                            this.coordList[coordIndex].y = y - i
                            this.coordList[coordIndex].score = 0
                            this.coordList[coordIndex].vertical = false
                            coordIndex++
                        }
                    }
                }
            }
        }
    }

    //default is 0, positive for better match , negative for bad 检查坐标是否合理
    checkFitScore(word, x, y, vertical) {
        let fitScore = 0
        //vertical checking 纵向是否合理
        if (vertical) {
            for (let i = 0; i < word.length; i++) {
                //check for empty space preceeding first character of word if not on edge  检测覆盖已有单词尾部
                if (i === 0 && x > 0) {
                    if (this.grid[x - 1][y] !== this.EMPTYCHAR) { //                ABC[DEF]
                        fitScore = -1
                        break
                    }
                } else if (i === word.length - 1 && x < this.Rows) { //check for empty space after last character of word if not on edge  检测是否覆盖已有单词首部
                    if (this.grid[x + i + 1][y] !== this.EMPTYCHAR) { //            [ABC]DEF
                        fitScore = -2
                        break
                    }
                }
                if (x + i < this.Rows) {
                    if (this.grid[x + i][y] === word[i]) { //letter match - aka cross point  检测是否匹配
                        fitScore += 1
                    } else
                    if (this.grid[x + i][y] !== this.EMPTYCHAR) { //letter doesn't match and it isn't empty so there is a collision  是否覆盖
                        fitScore = -3 //                                           [ABCD]EF
                        break //
                    } else { //verify that there aren't letters if it's not a crosspoint 是否存在冲突
                        //check right side if it isn't on the edge  右侧冲突
                        if (y < this.Columns - 1) {
                            if (this.grid[x + i][y + 1] !== this.EMPTYCHAR) { //    [A]BCD
                                fitScore = -4 //                                   [C]B
                                break //                                           [D]
                            }
                        }
                        //                                                          check left side if it isn't on the edge   左侧冲突
                        if (y > 0) {
                            if (this.grid[x + i][y - 1] !== this.EMPTYCHAR) { //    [A]BCD
                                fitScore = -5 //                                   [B]C
                                break //                                           [C]
                            }
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                if (i === 0 && y > 0) {
                    if (this.grid[x][y - 1] !== this.EMPTYCHAR) {
                        fitScore = -1
                        break
                    }
                } else
                if (i === word.length - 1 && y + i < this.Columns - 1) {
                    if (this.grid[x][y + i + 1] !== this.EMPTYCHAR) {
                        fitScore = -2
                        break
                    }
                }
                if (y + i < this.Columns) {
                    if (this.grid[x][y + i] === word[i]) {
                        fitScore += 1
                    } else
                    if (this.grid[x][y + i] !== this.EMPTYCHAR) {
                        fitScore = -3
                        break
                    } else {
                        if (x < this.Rows) {
                            if (this.grid[x + 1][y + i] !== this.EMPTYCHAR) {
                                fitScore = -4
                                break
                            }
                        }
                        if (x > 0) {
                            if (this.grid[x - 1][y + i] !== this.EMPTYCHAR) {
                                fitScore = -5
                                break
                            }
                        }
                    }
                }
            }
        }
        fitScore = fitScore > 1 ? 0 : fitScore
        return fitScore
    }

    placeWord(word, x, y, vertical) {
        let isPlaced = false
        if (vertical) {
            if (word.length + x < this.Rows) {
                for (let i = 0; i < word.length; i++) {
                    this.grid[x + i][y] = word[i]
                }
                isPlaced = true
            }
        } else {
            if (word.length + y < this.Columns) {
                for (let i = 0; i < word.length; i++) {
                    this.grid[x][y + i] = word[i]
                }
                isPlaced = true
            }
        }
        if (isPlaced) {
            let currentIndex = this.WordsCoordinatesList.length
            this.WordsCoordinatesList[currentIndex] = {}
            this.WordsCoordinatesList[currentIndex].word = word
            this.WordsCoordinatesList[currentIndex].x = x
            this.WordsCoordinatesList[currentIndex].y = y
            this.WordsCoordinatesList[currentIndex].vertical = vertical
        }
        return isPlaced
    }
}

let game = new Wordscape([{
    word: "HUM"
}, {
    word: "HIM"
}, {
    word: "MUD"
}, {
    word: "MID"
}, {
    word: "DIM"
}, {
    word: "HUMID"
}])