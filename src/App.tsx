import { useState, useEffect, useRef } from "react";
import vibr from '/assets/vibr.png'
import sound from '/assets/audio1.mp3'
import piter from '/assets/piter.png';

const MovingElement = () => {
  const audioRef = useRef(new Audio(sound)); // Сохраняем Audio в useRef
  const [isMoving, setIsMoving] = useState(false);
  const [isPeter, setIsPeter] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const audio = audioRef.current; // Берём текущий Audio
    if (!isMoving){
        audio.pause();
      audio.currentTime = 0; // Сбрасываем время трека (опционально)
        return
    } // Если анимация выключена, ничего не делаем
    audio.play()
    let frameId: any;
    let direction = 1; // 1 - вправо, -1 - влево
    let verticalDirection = 1; // 1 - вниз, -1 - вверх
    let steps = 0;

    const animate = () => {
      setPosition((prev) => {
        // Меняем направление каждые 50 шагов
        if (steps % 1 === 0) {
          direction = Math.random() > 0.5 ? 1 : -1; // Меняем горизонтальное направление
          verticalDirection = Math.random() > 0.5 ? 1 : -1; // Случайное вертикальное направление
        }

        return {
          x: prev.x + direction * 4, // Движение по X
          y: prev.y + verticalDirection * 2, // Случайное движение по Y
        };
      });

      steps++;
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameId) cancelAnimationFrame(frameId); // Очистка анимации
    };
  }, [isMoving]); // Зависимость от isMoving

  return (
    <div className='peter' style={{
  ...(isPeter && { backgroundImage: `url(${piter})` })
}}>
      <div className='main'>
       <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s ease-out", // Плавное движение
        }}
      ><img src={vibr} className="image"></img></div>
     <button onClick={() => setIsMoving(!isMoving)} className="btn">
        {isMoving ? "Устал" : "Пошло поехало"}
      </button>
         <button onClick={() => setIsPeter(!isPeter)} className="btn2">
        {isPeter ? "Стандарт эдишн" : "Петербург эдишн"}
    </button>
        <div>
            розовый х@й — садись и кайфуй™
        </div>
    </div>


    </div>

  );
};

export default MovingElement;