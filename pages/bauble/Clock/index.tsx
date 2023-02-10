import { useEffect, useState } from "react";

const Clock = () => {
  const [secs, setSec] = useState(Number);
  // 获取当前 时，分，秒

  const animate = (
    canvas: HTMLCanvasElement,
    hour: number,
    sec: number,
    min: number
  ) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.save();
      ctx?.clearRect(0, 0, 500, 500);
      ctx?.translate(150, 150); //把中心点设为150,150
      // 把状态保存起来
      ctx?.save();
      //   圆盘
      ctx?.beginPath();
      ctx!.fillStyle = "blue";
      ctx?.arc(0, 0, 100, 0, Math.PI * 2);
      ctx?.stroke();
      ctx?.closePath();
      //   小圆
      ctx?.beginPath();
      ctx?.arc(0, 0, 5, 0, Math.PI * 2);
      ctx!.fillStyle = "blue";
      ctx?.stroke();
      ctx?.closePath();
       //   时针
       ctx?.rotate(
        ((2 * Math.PI) / 12) * hour +
          ((2 * Math.PI) / 12) * (min / 60) -
          Math.PI / 2
      );
      ctx?.beginPath();
      ctx?.moveTo(-10, 0);
      ctx?.lineTo(40, 0);
      ctx!.lineWidth = 5;
      ctx?.stroke();
      ctx?.closePath();
      ctx?.restore();
      ctx?.save();
       //   秒针
       ctx?.rotate(
        ((2 * Math.PI) / 60) * min +
          ((2 * Math.PI) / 60) * (sec / 60) -
          Math.PI / 2
      );
      ctx?.beginPath();
      ctx?.moveTo(-10, 0);
      ctx?.lineTo(80, 0);
      ctx!.lineWidth = 1;
      ctx?.stroke();
      ctx?.closePath();
      ctx?.restore();
      ctx?.save();

      //   分针
      ctx?.rotate(((2 * Math.PI) / 60) * sec - Math.PI / 2);
      ctx?.beginPath();
      ctx?.moveTo(-10, 0);
      ctx?.lineTo(60, 0);
      ctx!.lineWidth = 3;
      ctx?.stroke();
      ctx?.closePath();
      ctx?.restore();
      ctx?.save();
     
     

      // 绘制刻度，也是跟绘制时分秒针一样，只不过刻度是死的
      ctx!.lineWidth = 1;
      for (let i = 0; i < 60; i++) {
        ctx?.rotate((2 * Math.PI) / 60);
        ctx?.beginPath();
        ctx?.moveTo(90, 0);
        ctx?.lineTo(100, 0);
        // ctx.strokeStyle = 'red'
        ctx?.stroke();
        ctx?.closePath();
      }
      ctx?.restore();
      ctx?.save();
      ctx!.lineWidth = 5;
      for (let i = 0; i < 12; i++) {
        ctx?.rotate((2 * Math.PI) / 12);
        ctx?.beginPath();
        ctx?.moveTo(85, 0);
        ctx?.lineTo(100, 0);
        ctx?.stroke();
        ctx?.closePath();
      }
      ctx?.restore();

      ctx?.restore();
    }
  };
  useEffect(() => {
    console.log(secs);

    
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    setInterval(() => {
        let time = new Date();
        let hour = time.getHours() % 12;
        let min = time.getMinutes();
        let sec = time.getSeconds();
    setSec(sec);


      animate(canvas, hour, min, sec);
    }, 1000);
    // window.requestAnimationFrame(()=>animate(canvas,hour,min,sec))
  }, [secs]);

  return (
    <>
      <div>CLOCK</div>
      <canvas width="302" height="302" id="canvas"></canvas>
    </>
  );
};
export default Clock;
