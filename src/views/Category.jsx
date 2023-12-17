import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import MobileInput from '../components/MobileInput';
import logo from '../assets/logo.png';
import mini_logo from '../assets/mini-logo.png';

function Category() {
  const { id } = useParams();
  const category = id == 'random' ? '' : id?.split('-').join('');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // window width size

  const [inputValue, setInputValue] = useState(''); // input/answer
  const [data, setData] = useState({}); // data for question (api)
  const [correct, setCorrect] = useState(false); // answer is correct
  const [isStarted, setIsStarted] = useState(false); // if game started
  const [enable, setEnable] = useState(false); // if input is enable
  const [time, setTime] = useState(23); // countdown timer
  const [points, setPoints] = useState(0); // current points
  const [questionCount, setQuestionCount] = useState({ curr: 1, max: 10 }); // number of questions answered or not, and max set of question
  const [currentPoint, setCurrentPoint] = useState({
    visible: false,
    currentPoint: 0,
  }); // add point visibility and value

  // fetch another next data
  const nextQuestion = () => {
    if (isStarted) {
      const fetchData = async () => {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/trivia?category=${category}`,
          {
            headers: {
              'X-Api-Key': '0cEqZkmQlCldfxQrLGua5g==ddrT3HdrZsDrlfzm',
            },
          }
        );
        const data = await response.json();
        if (data) {
          setCurrentPoint({ visible: false, currentPoint: 0 });
          setQuestionCount((prev) => ({ ...prev, curr: prev.curr + 1 }));
          setInputValue('');
          setTime(23);
          setCorrect(false);
          setEnable(true);
          setData(data[0]);
        }
      };

      fetchData();
    }
  };

  // fetch data for the first time
  const fetchData = async () => {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/trivia?category=${category}`,
      {
        headers: {
          'X-Api-Key': '0cEqZkmQlCldfxQrLGua5g==ddrT3HdrZsDrlfzm',
        },
      }
    );
    const data = await response.json();
    if (data) {
      setEnable(true);
      setData(data[0]);
    }
  };

  // stop game clear states
  const stopGame = () => {
    setInputValue('');
    setTime(23);
    setCorrect(false);
    setEnable(false);
    setPoints(0);
    setData({});
    setIsStarted(false);
    setCurrentPoint({ visible: false, currentPoint: 0 });
    setQuestionCount((prev) => ({ ...prev, curr: 1 }));
  };

  // restart game clear states and fetch data
  const restartGame = () => {
    setPoints(0);
    setData({});
    setIsStarted(false);
    setQuestionCount((prev) => ({ ...prev, curr: 0 }));
    setIsStarted(true);
    nextQuestion();
  };

  // on press any key
  const handleKeyDown = (event) => {
    if (enable && !correct) {
      const keyPressed = event.key;
      const isCtrlPressed = event.ctrlKey || event.metaKey;
      if (keyPressed === 'Backspace') {
        setInputValue((prevValue) => prevValue.slice(0, -1));
      } else if (keyPressed == 'Escape') {
        event.preventDefault();
        stopGame();
      } else if (keyPressed == 'Tab') {
        event.preventDefault();
        if (enable) {
          setEnable(false);
          nextQuestion();
        }
      } else if (isCtrlPressed && keyPressed == ' ') {
        event.preventDefault();
        restartGame();
      } else if (isCtrlPressed || keyPressed.length > 1) {
        event.preventDefault();
      } else if (
        keyPressed === ' ' ||
        keyPressed === '-' ||
        keyPressed === '.'
      ) {
        event.preventDefault();
        setInputValue((prevValue) => prevValue + keyPressed);
      } else if (keyPressed.length == 1) {
        event.preventDefault();
        setInputValue((prevValue) => prevValue + keyPressed);
      } else {
        event.preventDefault();
      }
    } else {
      if (event.key === ' ' && !isStarted) {
        fetchData();
        return setIsStarted(true);
      }
    }
  };

  // check if the game is already finished and if space is clicked to restart
  useEffect(() => {
    const newGame = (event) => {
      if (event.key === ' ' && questionCount.curr > questionCount.max) {
        restartGame();
      }
    };

    if (windowWidth >= 1024) {
      window.addEventListener('keydown', newGame);
      return () => {
        window.removeEventListener('keydown', newGame);
      };
    }
  }, [questionCount, windowWidth]);

  // handle input field mobile
  const handleKeyDownMobile = (event) => {
    if (enable && !correct) {
      setInputValue(event.target.value);
    }
  };

  // use effect for checking if the answer is correct
  useEffect(() => {
    if (inputValue.trim().toLowerCase() == data?.answer?.trim().toLowerCase()) {
      setCorrect(true);
      setEnable(false);
      const pointData = Math.round((time / 20) * 100);
      setPoints((prevPoint) => prevPoint + pointData);
      setCurrentPoint({ visible: true, currentPoint: pointData });

      setTimeout(() => {
        return nextQuestion();
      }, 3000);
    }
  }, [inputValue]);

  // use effect for countdown
  useEffect(() => {
    if (data) {
      if (enable) {
        if (questionCount.curr <= questionCount.max) {
          if (time > 0) {
            const intervalId = setInterval(() => {
              setTime((prevMilliseconds) => prevMilliseconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
          } else {
            setEnable(false);
            setTimeout(() => {
              if (enable) {
                return nextQuestion();
              }
            }, 3000);
          }
        }
      }
    }
  }, [time, enable, data]);

  // use effect for handling window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // use effect for checking window input
  useEffect(() => {
    if (windowWidth >= 1024) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [enable, windowWidth]);

  return (
    <div className='px-12 lg:px-0 py-12 relative flex justify-center items-center flex-col'>
      <div className='container flex justify-between items-center'>
        <Link
          to='/'
          className='hidden lg:block text-5xl font-black outline-none'
        >
          <img src={logo} alt='logo' className='w-[250px] mx-12' />
        </Link>
        <Link to='/' className='block lg:hidden text-5xl font-black'>
          <img src={mini_logo} alt='logo' className='w-[150px]' />
        </Link>
        <div className='text-2xl font-black mx-0 lg:mx-12'>
          <div className=' text-gray-400'>
            Points: <span className='text-green-400 text-4xl'>{points}</span>
          </div>
          {isStarted && (
            <div className='text-gray-400'>
              {questionCount?.curr > questionCount?.max
                ? questionCount?.max
                : questionCount?.curr}
              /<span className='text-green-400'>{questionCount?.max}</span>
            </div>
          )}
        </div>
      </div>
      <div className='container py-6 flex justify-between items-start flex-col-reverse lg:flex-row'>
        <CategoryList param={id} />
        <div className='grow flex flex-col items-stretch w-full mb-12 lg:mb-0'>
          <div className='text-center my-12'>
            <div className='text-sm uppercase font-semibold tracking-widest'>
              Category
            </div>
            <div className='uppercase text-3xl text-red-400 font-black'>
              {id.split('-').join(' ')}
            </div>
          </div>
          {isStarted && (
            <>
              <div className='text-lg font-bold text-center'>Timer</div>
              <div className='text-8xl text-center font-bold'>
                {time <= 20 ? (
                  <>
                    {time <= 5 ? (
                      <span
                        className={` ${time <= 1 && 'text-red-600'} ${
                          time <= 3 && 'text-red-500'
                        } ${time <= 5 && 'text-red-400'}`}
                      >
                        {time}
                      </span>
                    ) : (
                      time
                    )}
                  </>
                ) : (
                  <span className='text-green-400'>{time.toString()[1]}</span>
                )}
              </div>
              {questionCount.curr <= questionCount.max && (
                <>
                  {data?.question && (
                    <h1 className='text-center text-2xl text-gray-800 my-6'>
                      {data?.question}
                    </h1>
                  )}
                </>
              )}
              {questionCount.curr <= questionCount.max && (
                <div className='hidden lg:flex relative text-center justify-center items-center z-[1] text-9xl font-black uppercase text-gray-100'>
                  {inputValue}
                  <h1 className='absolute text-7xl text-center font-black uppercase z-[2] text-gray-800'>
                    {inputValue}
                  </h1>
                </div>
              )}
              {questionCount.curr <= questionCount.max && (
                <>
                  {data?.question && (
                    <MobileInput
                      inputValue={inputValue}
                      handleKeyDownMobile={handleKeyDownMobile}
                      stopGame={stopGame}
                      restartGame={restartGame}
                      nextQuestion={nextQuestion}
                    />
                  )}
                </>
              )}
              {questionCount.curr > questionCount.max ? (
                <>
                  <div className='hidden lg:block text-center'>
                    <h1 className='text-lg mt-6 text-center font-bold'>
                      Total Points
                    </h1>
                    <h1 className='text-5xl text-green-400 text-center font-black uppercase'>
                      {points}
                    </h1>
                    <h1 className='text-7xl py-12 text-red-400 text-center font-black uppercase'>
                      Game Over
                    </h1>
                    <p className='uppercase animate'>
                      Press{' '}
                      <span className='border border-gray-400 py-2 px-4 rounded-sm mx-2'>
                        Space
                      </span>{' '}
                      to Play Again
                    </p>
                  </div>
                  <div className='block lg:hidden text-center'>
                    <h1 className='text-7xl py-12 text-red-400 text-center font-black uppercase'>
                      Game Over
                    </h1>
                    <button
                      className='px-6 py-2 border-2 border-green-400 text-green-400 text-xl uppercase'
                      onClick={() => {
                        setData({});
                        setIsStarted(true);
                        setQuestionCount({ ...questionCount, curr: 1 });
                        fetchData();
                        setPoints(0);
                      }}
                    >
                      Play Again
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  {correct && (
                    <>
                      <h1 className='text-5xl text-green-400 text-center font-black uppercase'>
                        Awesome!
                      </h1>
                      {questionCount.curr != questionCount.max && (
                        <h3 className='text-xl text-center font-medium py-4 uppercase text-gray-800 tracking-widest'>
                          Loading Next Question...
                        </h3>
                      )}
                    </>
                  )}
                  {time == 0 && (
                    <>
                      <h1 className='text-5xl text-center font-black uppercase text-red-400'>
                        Time&apos;s Up
                      </h1>
                      {questionCount.curr != questionCount.max && (
                        <h3 className='text-xl text-center font-medium py-4 uppercase text-gray-800 tracking-widest'>
                          Loading Next Question...
                        </h3>
                      )}
                    </>
                  )}

                  {currentPoint.visible && (
                    <div className='text-3xl text-center text-green-400 font-bold transition-all'>
                      + {currentPoint.currentPoint}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {!isStarted && (
            <>
              <div className='hidden lg:block text-center'>
                <p className='uppercase animate'>
                  Press{' '}
                  <span className='border border-gray-400 py-2 px-4 rounded-sm mx-2'>
                    Space
                  </span>
                  to Start
                </p>
              </div>
              <div className='block lg:hidden text-center'>
                <button
                  className='px-6 py-2 border-2 border-green-400 text-green-400 text-xl uppercase'
                  onClick={() => {
                    setIsStarted(true);
                    fetchData();
                    setPoints(0);
                  }}
                >
                  Start
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
