import React from 'react';
import './App.css';
//hooks
function App() {

    type inputValues = {
        n: number,
        m: number,
        c: Array<number>,
    }

    let result: number = 0;

    let n = 0;
    let m = 0;
    let c: Array<number> | any = [];

    const placesCount = (e: any) => {
        n = Number(e.target.value)
        console.log(n)
    }
    const hoursCount = (e: any) => {
        m = Number(e.target.value)
        console.log(n)
    }
    const biscuitsCountArray = (e: any) => {
        c = e.target.value.split(',').map((item: string) => Number(item));
        console.log(c)
    }


    // const inputFunction: React.FC<inputValues> = ({n, m, c}): number | string | any => {
    const inputFunction = (n: number, m: number, c: Array<number>) => {

        // n = 3;
        // m = 6;
        // c = [4,18,4]

        // debugger
        console.log(n, m, c)
        // if (c.length !== n) {
        //     return 'Oops! Count of places with biscuits are not match to N'
        // }

        // let result: number = 0;
        let placesCount: number = n;
        let hours :number = m;
        let onePlaceBiscuitsPerHourArr: Array<number> = [];

        const natureBiscuitsArr = c.filter( (b) => b >= 1)
        if (natureBiscuitsArr.length < c.length) {
            placesCount = natureBiscuitsArr.length
        }

        console.log(natureBiscuitsArr)
        console.log(placesCount)

        const decreasedBiscuits = natureBiscuitsArr.sort(
            function (a, b) {
            return b - a;
        });

        console.log(decreasedBiscuits)

        if (n > m) {
            result = 0;
            console.log('n>m', result)
        } else if (n === m) {
            result = decreasedBiscuits[0];
            console.log('n=m', result)
        } else if (n < m) {
            const biscuitsSum = natureBiscuitsArr.reduce((partialSum, a) => partialSum + a, 0)
            const onePlaceBiscuitsArithmeticMean = biscuitsSum / placesCount;
            const onePlaceHoursArithmeticMean = Math.floor(hours / placesCount); //найти остаток целое - оставшиеся часы

            console.log(biscuitsSum, onePlaceBiscuitsArithmeticMean, onePlaceHoursArithmeticMean)

            natureBiscuitsArr.map((onePlaceBiscuits) => {
                const f = Number((onePlaceBiscuits / onePlaceBiscuitsArithmeticMean).toFixed(6));
                let onePlaceHours = 1;
                let onePlaceBiscuitsPerHour = 0;

                if (f > 1) {
                    onePlaceHours = Math.floor(f * onePlaceHoursArithmeticMean)
                    onePlaceBiscuitsPerHour = Math.ceil(onePlaceBiscuits / onePlaceHours)
                    console.log('f>1', onePlaceHours, onePlaceBiscuitsPerHour)
                } else {
                    onePlaceBiscuitsPerHour = onePlaceBiscuits;
                    console.log('f<=1', '1', onePlaceBiscuitsPerHour)
                }
                onePlaceBiscuitsPerHourArr.push(onePlaceBiscuitsPerHour);
            })

            console.log(onePlaceBiscuitsPerHourArr)

            const decreaseOnePlaceBiscuitsPerHourArr: Array<number> = onePlaceBiscuitsPerHourArr.sort(
                function (a, b) {
                    return b - a;
                }
            );
            console.log(decreaseOnePlaceBiscuitsPerHourArr)
            result = decreaseOnePlaceBiscuitsPerHourArr[0];
            console.log('n<m', result)
        }

        // return result;
    }

  return (
    <div className="App">
      <input onChange={(e) => placesCount(e)}/>
      <input onChange={(e) => hoursCount(e)}/>
      <input onChange={(e) => biscuitsCountArray(e)}/>
        <button onClick={() => inputFunction(n,m,c)}>OK</button>
        <div>{`Result = ${result}`}</div>
    </div>
  );
}

export default App;
