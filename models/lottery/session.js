class LotterySession {
  /**
   *
   * @param {{
   *  id: string;
   *  productId: string;
   *  winningNumbers: Array<number>;
   *  estimatedJackpot: number;
   *  actualJackpot: number;
   *  drawDatetime: string;
   *  winners: Array;
   *  assets: Array;
   *  status: string;
   * }} param0
   */
  constructor({
    id,
    productId,
    winningNumbers,
    estimatedJackpot,
    actualJackpot,
    drawDatetime,
    winners,
    assets,
    status,
  }) {
    this.id = id
    this.productId = productId
    this.winningNumbers = winningNumbers
    this.estimatedJackpot = estimatedJackpot
    this.actualJackpot = actualJackpot
    this.drawDatetime = drawDatetime
    this.winners = winners
    this.assets = assets
    this.status = status
  }
}

export default LotterySession
