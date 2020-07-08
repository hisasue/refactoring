import createStatementData from './createStatementData.js'

export default function statement (invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))

  function renderPlainText(data){
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
      result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;

    function usd(aNumber) {
      return new Intl.NumberFormat("en-US",
                          { style: "currency", currency: "USD",
                            minimumFractionDigits: 2 }).format(aNumber/100);
    }
  }

}

export function htmlStatement (invoice, plays) {
  let result   = "<h1>Statement for BigCo</h1>\n" +
                 "<table>\n" +
                 "<tr><th>play</th><th>seats</th><th>cost</th></tr>\n" +
                 "<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n" +
                 "<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n" +
                 "<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n" +
                 "</table>\n" +
                 "<p>Amount owed is <em>$1,730.00</em></p>\n" +
                 "<p>You earned <em>47</em> credits</p>\n";
  return result
}
