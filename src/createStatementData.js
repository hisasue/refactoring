export default function createStatementData(invoice, plays) {
  let result = {}
  result.customer  = invoice.customer
  result.performances  = invoice.performances.map(enrichPerformance)
  result.totalAmount = totalAmount(result.performances)
  result.totalVolumeCredits = totalVolumeCredits(result.performances)
  return result
  
  function createPerformanceCalculator(aPerformance, aPlay){
    switch (aPlay.type) {
      case "tragedy": return new TragedyPerformanceCalculator(aPerformance, playFor(aPerformance)); break;
      case "comedy":  return new ComedyPerformanceCalculator(aPerformance, playFor(aPerformance)); break;
      default: throw new Error(`unknown type: ${aPlay.type}`);
    }
  }

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
    return result
  }

  function totalAmount(performances) {
    let result = 0
    for (let perf of performances) {
      result += perf.amount
    }
    return result
  }

  function totalVolumeCredits(performances){
    let result = 0
    for (let perf of performances) {
      result += perf.volumeCredits
    }
    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error(`must be implemented in subclass`);
  }

  get volumeCredits() {
    let result = 0
    result += Math.max(this.performance.audience - 30, 0);
    return result
  }
}

class TragedyPerformanceCalculator extends PerformanceCalculator {
  get amount(){
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result
  }
}

class ComedyPerformanceCalculator extends PerformanceCalculator {
  get amount(){
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result
  }

  get volumeCredits(){
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
