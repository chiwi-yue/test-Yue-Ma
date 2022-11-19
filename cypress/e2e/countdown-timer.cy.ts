const date = new Date();
date.setHours(date.getHours() - 2); // Rewind app clock hours backwards two hours
const regExpHour = new RegExp(/\-*\d{1,2}h/); // timer format: '8h|-12h'
const regExpPositiveMinSec = new RegExp(/^\d{1,2}(m|s)\s*\d{1,2}(m|s)/); // timer format: '19m 23s'
const regExpNegativeMinSec = new RegExp(/\-*\d{1,2}(m|s)\s*\d{1,2}(m|s)/); // timer format: '-21m 46s'
const regExpMin = new RegExp(/\-*\d{1,2}m/); // timer format: '37m|-2m'
const regExpSec = new RegExp(/\-*\d{1,2}s/); // timer format: '25s|-20s'

describe('Countdown Timer', () => {
  beforeEach(() => {
    cy.clock(date);
    cy.visit('/')
  });

  it('The timer should count down correctly great than one hour', () => {
    const timeArray:any = [];
    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach(el => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        timeArray.push(time);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        timeArray.push(time);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        timeArray.push(time);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        timeArray.push(time);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        timeArray.push(time);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      })
    })

    cy.tick(1000 * 60 * 60 * 1);
    cy.wait(100);

    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach((el, index) => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      })
    })
  });

  it('The timer should count down correctly less than one hour', () => {
    const timeArray:any = [];
    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach(el => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        timeArray.push(time);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        timeArray.push(time);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        timeArray.push(time);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        timeArray.push(time);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        timeArray.push(time);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      })
    })

    cy.tick(1000 * 60 * 60 * 2).log("Fast forward two hours");
    cy.wait(100);

    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach((el, index) => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      })
    })
  });

  it('The timer should count down correctly when the match already passed', () => {
    const timeArray:any = [];
    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach(el => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        timeArray.push(time);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        timeArray.push(time);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        timeArray.push(time);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        timeArray.push(time);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        timeArray.push(time);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      })
    })

    cy.tick(1000 * 60 * 60 * 2.5).log("Fast forward two and half hours");
    cy.wait(100);

    cy.get('.race-name').next().then(($timer) => {
      $timer.toArray().forEach((el, index) => {
      const timeStr = el.innerText;
      if (regExpHour.test(timeStr)) {
        const time = parseInt(timeStr) * 60 * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpPositiveMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = minNum * 60 + secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpNegativeMinSec.test(timeStr)) {
        const minNum = Number(timeStr.split("m ")[0]);
        const secNum = parseInt(timeStr.split("m ")[1]);
        const time = (minNum * 60 + secNum) * -1;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpMin.test(timeStr)) {
        const minNum = parseInt(timeStr);
        const time = minNum * 60;
        expect(time).to.be.lessThan(timeArray[index]);
      } else if (regExpSec.test(timeStr)) {
        const secNum = parseInt(timeStr);
        const time = secNum;
        expect(time).to.be.lessThan(timeArray[index]);
      } else (
        cy.log(`The timer "${timeStr}" is invalid.`)
      );
      })
    })
  });
});
