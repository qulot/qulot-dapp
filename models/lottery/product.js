class LotteryProduct {
  /**
   *
   * @param {{
   *  id: string;
   *  name: string;
   *  picture: string;
   *  verboseName: string;
   *  isActive: bool;
   *  isMro: bool;
   *  usdPricePerTicket: number;
   *  lastSessionId: string;
   *  lastSessionWinningNumbers: Array<string>;
   *  lastSessionDrawDatetime: string;
   *  nextSessionId: string;
   *  nextSessionDrawDatetime: string;
   *  nextSessionEstimatedJackpot: number;
   *  numberOfItems: number;
   *  minValuePerItem: number;
   *  maxValuePerItem: number;
   * }} param0
   */
  constructor({
    id,
    name,
    picture,
    verboseName,
    isActive,
    isMro,
    // last session info
    lastSessionId,
    lastSessionWinningNumbers,
    lastSessionDrawDatetime,
    // next session info
    nextSessionId,
    nextSessionDrawDatetime,
    nextSessionEstimatedJackpot,

    usdPricePerTicket,
    numberOfItems,
    minValuePerItem,
    maxValuePerItem
  }) {
    this.id = id
    this.name = name
    this.picture = picture
    this.isActive = isActive
    this.isMro = isMro
    this.verboseName = verboseName

    this.usdPricePerTicket = usdPricePerTicket
    this.numberOfItems = numberOfItems
    this.minValuePerItem = minValuePerItem
    this.maxValuePerItem = maxValuePerItem

    // last session info
    this.lastSessionId = lastSessionId
    this.lastSessionWinningNumbers = lastSessionWinningNumbers
    this.lastSessionDrawDatetime = lastSessionDrawDatetime

    // next session info
    this.nextSessionId = nextSessionId
    this.nextSessionDrawDatetime = nextSessionDrawDatetime
    this.nextSessionEstimatedJackpot = nextSessionEstimatedJackpot
  }

  /**
   * here I make a POJO's copy of the class instance
   * @returns
   */
  toJSON() {
    return { ...this }
  }
}

export default LotteryProduct
