import { useEffect } from "react";
const SearchLight = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.beginPath();
      ctx!.fillStyle = "#000";
      ctx?.fillRect(0, 0, 300, 300);
      ctx?.save();
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        canvas.ontouchmove = (e) => {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          const x = e.touches[0].pageX - canvas.offsetLeft;
          const y = e.touches[0].pageY - canvas.offsetTop;

          ctx?.beginPath();
          ctx!.fillStyle = "#000";
          ctx?.fillRect(0, 0, 300, 300);
          ctx?.save();

          ctx?.beginPath();
          ctx?.arc(x, y, 50, 0, Math.PI * 2);
          ctx!.fillStyle = "#fff";
          ctx?.fill();
          ctx?.clip();

          ctx!.fillStyle = "red";
          ctx!.font = "40px SimSun, Songti SC";
          ctx?.fillText("CANVAS 666", 50, 50);
          ctx?.fillText("CANVAS 666", 50, 150);
          ctx?.fillText("CANVAS 666", 50, 250);
          ctx?.closePath();
          ctx?.restore();
        };
      } else {
        canvas.onmousemove = (e) => {
          ctx?.clearRect(0, 0, canvas.width, canvas.height);
          const x = e.pageX - canvas.offsetLeft;
          const y = e.pageY - canvas.offsetTop;
          ctx?.beginPath();
          ctx!.fillStyle = "#000";
          ctx?.fillRect(0, 0, 300, 300);
          ctx?.save();

          ctx?.beginPath();
          ctx?.arc(x, y, 50, 0, Math.PI * 2);
          ctx!.fillStyle = "#fff";
          ctx?.fill();
          ctx?.clip();

          ctx!.fillStyle = "red";
          ctx!.font = "40px SimSun, Songti SC";
          ctx?.fillText("CANVAS 666", 50, 50);
          ctx?.fillText("CANVAS 666", 50, 150);
          ctx?.fillText("CANVAS 666", 50, 250);
          ctx?.closePath();
          ctx?.restore();
        };
      }
    }
  });
  return (
    <>
      <h2 className="text-center">SearchLight</h2>
      <div className="flex items-center justify-center">
        <canvas id="canvas" height="300" width="300"></canvas>
      </div>
    </>
  );
};
export default SearchLight;
