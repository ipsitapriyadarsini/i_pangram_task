import moment from "moment-timezone";
import { useEffect, useState } from "react";

const App = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [tzDate, setTzDate] = useState(moment().tz("GMT+0530"));
  const [time, setTime] = useState([]);
  const weekDays = [1, 1, 1, 1, 1, 1, 1];

  useEffect(() => {
    dateFormat();
    compareDate(currentDate);
  }, [tzDate]);

  function compareDate(currentDate: any) {
    let cDate = +new Date();
    
    let comDate = +new Date(currentDate);
    if (cDate > comDate) {
      return console.log(true)
    } else {
      return console.log(false)
    }
  }

  // console.log(moment.tz.names());

  const dateFormat = () => {
    const timing = Array(28).fill(1);
    const arr: any = [];
    timing.forEach((_, i) => {
      arr.push(
        moment(tzDate)
          .add(i * 30, "minutes")
          .format("hh:mm A")
      );
    });
    setTime(arr);
  };
  // console.log(time);
  const previousHandler = () => {
    setCurrentDate(moment(currentDate).subtract(1, "w"));
    // setCurrentDate(moment(tzDate).subtract(1, "w"));
    // console.log(moment(currentDate).format("MMM DD YYYY"))
  };
  const nextHandler = () => {
    setCurrentDate(moment(currentDate).add(1, "w"));
  };

  const timezoneHandler = (e: any) => {
    if (e.target.value === "America") {
      setTzDate(moment().tz("America/Los_Angeles"));
    } else if (e.target.value === "London") {
      setTzDate(moment().tz("Europe/London"));
    } else {
      setTzDate(moment().tz("GMT+0530"));
    }
  };
  // console.log(moment(tzDate).format("MMM DD YYYY"));
  return (
    <>
      <div className="calender__header__wrapper">
        <div className="left__section" onClick={previousHandler}>
          <i className="bi bi-caret-left-fill"></i>Previous week
        </div>
        <div className="date__placeholder">
          {moment(currentDate).format("MMM DD YYYY")}
        </div>
        <div className="right__section" onClick={nextHandler}>
          Next week<i className="bi bi-caret-right-fill"></i>
        </div>
      </div>
      <div className="px-3">
        <span>TimeZone</span>
        <div className="timezone__select">
          <select
            className="form-select form-select-lg mb-3"
            onChange={(eve) => {
              timezoneHandler(eve);
            }}>
            <option value="Indian">Indian Standard time</option>
            <option value="London">(GMT+1) Europe/London</option>
            <option value="America">(GMT-7) America/Los Angeles</option>
          </select>
        </div>
      </div>
      <div className="days__side__bar">
        <div className="day__date__container">
          {weekDays.map((_, idx) => (
            <>
              <div key={idx} className="days__date__wrapper">
                <div className="days__label">
                  {moment(currentDate)
                    .add(idx, "d")
                    .format("dddd")
                    .slice(0, 3)
                    .toUpperCase()}
                </div>
                <div className="days__date">
                  {moment(currentDate).add(idx, "d").format("DD/MM")}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="time__input__checkbox__wrapper">
          {weekDays.map((_, i) => (
            <>
              <div className="border-bottom" key={i}>
                <div className="d-flex">
                  {time?.slice(0, 6).map((time, i) => (
                    <div className="time__input" key={i}>
                      <input type="checkbox" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex">
                  {time?.slice(6, 17).map((time, i) => (
                    <div className="time__input" key={i}>
                      <input type="checkbox" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex">
                  {time?.slice(17, 26).map((time, i) => (
                    <div className="time__input" key={i}>
                      <input type="checkbox" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
