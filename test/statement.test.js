import { expect } from 'chai';
import statement, {htmlStatement} from '../src/statement.js'

describe('statement', () => {
  let playsJson =
  {
    "hamlet": { "name": "Hamlet", "type": "tragedy" },
    "as-like": { "name": "As You Like It", "type": "comedy" },
    "othello": { "name": "Othello", "type": "tragedy" }
  };

  let invoicesJson =
    [
      {
        "customer": "BigCo",
        "performances": [
          {
            "playID": "hamlet",
            "audience": 55
          },
          {
            "playID": "as-like",
            "audience": 35
          },
          {
            "playID": "othello",
            "audience": 40
          }
        ]
      }
    ];

  it('should print a statement for multiple plays, single customer and multiple seats in plain text', () => {
    let expected = "Statement for BigCo\n" +
                   "  Hamlet: $650.00 (55 seats)\n" +
                   "  As You Like It: $580.00 (35 seats)\n" +
                   "  Othello: $500.00 (40 seats)\n" +
                   "Amount owed is $1,730.00\n" +
                   "You earned 47 credits\n";

    expect(statement(invoicesJson[0], playsJson)).to.equal(expected);
  });

  it('should print a statement in HTML document', () => {
    let expected = "<h1>Statement for BigCo</h1>\n" +
                   "<table>\n" +
                   "<tr><th>play</th><th>seats</th><th>cost</th></tr>\n" +
                   "<tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n" +
                   "<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n" +
                   "<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n" +
                   "</table>\n" +
                   "<p>Amount owed is <em>$1,730.00</em></p>\n" +
                   "<p>You earned <em>47</em> credits</p>\n";

    expect(htmlStatement(invoicesJson[0], playsJson)).to.equal(expected);
  });

});

