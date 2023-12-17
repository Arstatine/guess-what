function MobileInput({
  inputValue,
  handleKeyDownMobile,
  stopGame,
  restartGame,
  nextQuestion,
}) {
  return (
    <div className='block lg:hidden text-center py-6'>
      <input
        value={inputValue}
        onChange={handleKeyDownMobile}
        placeholder='Answer'
        className='text-3xl md:text-5xl text-center font-black uppercase text-gray-800 border-2 border-gray-400 w-full py-4 md:py-2 px-2 outline-none rounded'
      />
      <div className='flex gap-3 justify-center flex-wrap mt-6'>
        <button
          onClick={stopGame}
          className='text-xl md:text-2xl text-red-400 uppercase border-2 border-red-400 px-4 py-2 rounded'
        >
          Stop
        </button>
        <button
          onClick={restartGame}
          className='text-xl md:text-2xl text-green-400 uppercase border-2 border-green-400 px-4 py-2 rounded'
        >
          Restart
        </button>
        <button
          onClick={nextQuestion}
          className='text-xl md:text-2xl text-blue-400 uppercase border-2 border-blue-400 px-4 py-2 rounded'
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default MobileInput;
