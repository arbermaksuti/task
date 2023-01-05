import { useEffect, useState } from "react";

function App() {
  const carsExpenses = [30, 35, 40, 45];
  const fuelPrices = [1.1, 1.22, 1.47, 1.77];
  const [oneMonthExpenses, setOneMonthExpenses] = useState();
  const [firstTask, setFirstTask] = useState();
  const [secondTask, setSecondTask] = useState();
  const [thirdTask, setThirdTask] = useState();
  const [fourthTask, setFourthTask] = useState(0);
  const [fifthTask, setFifthTask] = useState();

  const calculateExpensesForMonth = (cars, extraWeeks, months) => {
    const monthlyPrice = months || 1;
    let weeksPrices = fuelPrices;

    for (let i = 0; i <= extraWeeks - 1; i++) {
      weeksPrices = [...weeksPrices, fuelPrices[i]];
    }

    return cars.map((oneCar) => {
      return {
        name: `Car ${oneCar}`,
        expenses: weeksPrices.reduce(
          (acc, value) =>
            parseFloat(
              (acc + value * carsExpenses[oneCar - 1] * monthlyPrice).toFixed(2)
            ),
          0
        ),
      };
    });
  };

  const calculateFirstTask = () => {
    setFirstTask(calculateExpensesForMonth([1, 2, 3, 4], undefined, 3));
  };

  const calculateSecondTask = () => {
    setSecondTask(
      [
        ...calculateExpensesForMonth([1, 2]),
        ...calculateExpensesForMonth([3, 4], 2),
      ].reduce((acc, value) => parseFloat((acc + value.expenses).toFixed(2)), 0)
    );
  };

  const calculateThirdTask = () => {
    setThirdTask([
      ...calculateExpensesForMonth([1, 4]).map((oneCar) => {
        return {
          ...oneCar,
          expenses: parseFloat(
            (
              (oneCar.expenses / carsExpenses[oneCar.name.at(-1) - 1]) *
              4
            ).toFixed(2)
          ),
        };
      }),
    ]);
  };

  const calculateFourthTask = async () => {
    for (
      let i = 1;
      (await calculateExpensesForMonth([1], i)[0].expenses) <
      (await calculateExpensesForMonth([4])[0].expenses);
      i++
    ) {
      setFourthTask(i);
    }
  };

  const calculateFifthTask = () => {
    let cars = [1, 2, 3, 4];
    let combinations = cars.flatMap((v, i) =>
      cars.slice(i + 1).map((w) => [v, w])
    );
    let results = combinations.map((oneCombination) =>
      oneCombination.reduce(
        (acc, value) => acc + calculateExpensesForMonth([value])[0].expenses,
        0
      )
    );

    const min = Math.min(...results);
    const index = results.indexOf(min);
    setFifthTask([min, combinations[index]]);
  };

  const style = {
    display: "flex",
    alignItems: "center",
  };
  const button = {
    marginLeft: "10px",
    cursor: "pointer",
  };

  return (
    <div>
      <div>
        <div style={style}>
          <h4>1). How much € does each car spend for 3 months?</h4>
          <button onClick={() => calculateFirstTask()} style={button}>
            Calculate
          </button>
        </div>
        <div style={{ display: "flex" }}>
          {firstTask &&
            firstTask.map((item, i) => (
              <p style={{ marginRight: "10px" }} key={i}>
                {item.name}: {item.expenses}€
              </p>
            ))}
        </div>
      </div>
      <div>
        <div style={style}>
          <h4>
            2). If Car1 and Car2 work for 1 month and Car3 and Car4 work for 1.5
            months how much € do they spend in total?
          </h4>
          <button onClick={() => calculateSecondTask()} style={button}>
            Calculate
          </button>
        </div>
        <div style={{ display: "flex" }}>
          {secondTask && <p>Total: {secondTask}€</p>}
        </div>
      </div>
      <div>
        <div style={style}>
          <h4>
            3). What is the average cost for one liter for car 1 & 4 if they
            work 1 month?
          </h4>
          <button onClick={() => calculateThirdTask()} style={button}>
            Calculate
          </button>
        </div>
        <div style={{ display: "flex" }}>
          {thirdTask &&
            thirdTask.map((item, i) => (
              <p style={{ marginRight: "10px" }} key={i}>
                {item.name}: {item.expenses}€
              </p>
            ))}
        </div>
      </div>
      <div>
        <div style={style}>
          <h4>
            4). How much more weeks can Car1 drive within the same budget as
            Car4 spends for 1 month?
          </h4>
          <button onClick={() => calculateFourthTask()} style={button}>
            Calculate
          </button>
        </div>
        {fourthTask != 0 && <p>{fourthTask}</p>}
      </div>
      <div>
        <div style={style}>
          <h4>
            5). What is the minimum monthly cost we need for two cars to be
            operational?
          </h4>
          <button onClick={() => calculateFifthTask()} style={button}>
            Calculate
          </button>
        </div>
        <div style={{ display: "flex" }}>
          {fifthTask && (
            <>
              {fifthTask[1].map((item, i) => (
                <p style={{ marginRight: "10px" }} key={i}>
                  Car: {item}
                </p>
              ))}
              <p>Total: {fifthTask[0]}€</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
