import { useEffect, useState } from "react";
const ScratchCard = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    const textList = [
      {
        text: "恭喜中奖300w",
        index: 1,
      },
      {
        text: "恭喜中奖100w",
        index: 1,
      },
      {
        text: "恭喜中奖10￥",
        index: 1,
      },
      {
        text: "恭喜中奖20￥",
        index: 1,
      },
      {
        text: "恭喜中奖100优惠券",
        index: 1,
      },
      {
        text: "恭喜中奖一台洗衣机",
        index: 1,
      },
    ];
    const r = Math.floor(Math.random() * textList.length);
    setText(textList[r].text);
  });

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
      ctx!.fillStyle = "darkgray";
      ctx?.fillRect(0, 0, 300, 100);
      ctx!.fillStyle = "#fff";
      ctx!.font = "20px SimSun, Songti SC";
      ctx?.fillText("刮刮卡", 120, 50);
      let isDraw = false;
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        canvas.ontouchstart = () => {
          isDraw = true;
        };
        canvas.ontouchmove = (e) => {
          if (!isDraw) {
            return;
          }
          const x = e.touches[0].pageX - canvas.offsetLeft;
          const y = e.touches[0].pageY - canvas.offsetTop;
          ctx!.globalCompositeOperation = "destination-out";
          ctx?.arc(x, y, 10, 0, 2 * Math.PI);

          ctx?.fill();
        };
        canvas.ontouchend = () => {
          isDraw = false;
        };
      } else {
        canvas.onmousedown = () => {
          isDraw = true;
        };
        canvas.onmousemove = (e) => {
          if (!isDraw) {
            return;
          }
          const x = e.pageX - canvas.offsetLeft;
          const y = e.pageY - canvas.offsetTop;
          ctx!.globalCompositeOperation = "destination-out";
          ctx?.arc(x, y, 10, 0, 2 * Math.PI);

          ctx?.fill();
        };
        canvas.onmouseup = () => {
          isDraw = false;
        };
      }
    }
  });
  return (
    <>
      <h2 className="text-red-600 text-center">ScratchCard</h2>
      <div className="flex justify-center items-center">
        <div className="absolute m-100 -z-10">{text}</div>
        <div>
          <canvas id="canvas" width="300" height="100"></canvas>
        </div>
      </div>
    </>
  );
};
export default ScratchCard;
