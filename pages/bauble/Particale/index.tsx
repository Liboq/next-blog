import { useEffect, useState } from "react";
const Particale = () => {
  const [objUrl, setObjUrl] = useState(Array<any>);
  let radius = 1;
  const initz = 30;
  let dots: any = [];
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const init = () => {
      //画布居中
      canvas.style.marginLeft = "calc(50vw - 500px)";
      canvas.style.marginTop = "calc(50vh - 300px)";

      //限制小球半径
      if (canvas.width > 500 || canvas.height > 300)
        radius >= 4 ? (radius = radius) : (radius = 4);
      else radius >= 2 ? (radius = radius) : (radius = 2);

      let promiseArr = () => {
        const image = new Image();
        // image.crossOrigin = '*'
        image.onload = function () {
          ctx!.drawImage(
            image,
            canvas.width / 2 - image.width / 2,
            image.height / 2 - image.height / 2,
            image.width,
            image.height
          );
          console.dir(image.width);
          
          if (image.width > image.height) {
            let ImgScale = image.height / image.width;
            image.width = canvas.width * 0.5;
            image.height = image.width * ImgScale;
          } else {
            let ImgScale = image.width / image.height;
            image.height = canvas.height * 0.7;
            image.width = image.height * ImgScale;
          }

          picLoop();
        };

        // .then(()=>{
        //   console.log(2222);
        setTimeout(() => {
          // debugger
          image.src = "/_next/image?url=%2Fimages%2Fpikachu.jpeg&w=384&q=75";
        });
        // })
      };
      promiseArr();

      //图片全部加载完毕开始绘制
    };

    const toPaticale = () => {
      let imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData!.data;
      for (let x = 0; x < imageData!.width; x += radius * 2) {
        for (let y = 0; y < imageData!.height; y += radius * 2) {
          let i = (x + y * canvas.width) * 4;

          if (
            data[i] !== 0 &&
            data[i] !== 255 &&
            data[i + 1] !== 255 &&
            data[i + 2] !== 255
          ) {
            let dot = {
              x: x, //图片x轴坐标
              y: y, //	  y轴坐标
              z: 0, //	  z轴坐标
              r: data[i], //	  rgba
              g: data[i + 1], //	  rgba
              b: data[i + 2], //	  rgba
              a: 1, //	  rgba
              ix: Math.random() * canvas.width, //初始化x轴坐标
              iy: Math.random() * canvas.height, //		y轴坐标
              iz: Math.random() * initz * 2 - initz, //		z轴坐标
              ir: 255, //		rgba
              ig: 255, //		rgba
              ib: 255, //		rgba
              ia: 0, //		rgba
              tx: Math.random() * canvas.width, //目标x轴坐标
              ty: Math.random() * canvas.height, //	  y轴坐标
              tz: Math.random() * initz * 2 - initz, //	  z轴坐标
              tr: 255, //	  rgba
              tg: 255, //	  rgba
              tb: 255, //	  rgba
              ta: 0, //	  rgba
            };
            dots.push(dot);
          }
        }
      }
    };

    const combineAnimate = () => {
      let combined = false;

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      dots.map((dot: any) => {
        if (
          Math.abs(dot.ix - dot.x) < 0.1 &&
          Math.abs(dot.iy - dot.y) < 0.1 &&
          Math.abs(dot.iz - dot.z) < 0.1
        ) {
          dot.ix = dot.x;
          dot.iy = dot.y;
          dot.iz = dot.z;
          dot.ir = dot.r;
          dot.ig = dot.g;
          dot.ib = dot.b;
          dot.ia = dot.a;
          combined = true;
        } else {
          dot.ix += (dot.x - dot.ix) * 0.07;
          dot.iy += (dot.y - dot.iy) * 0.07;
          dot.iz += (dot.z - dot.iz) * 0.07;
          dot.ir += (dot.r - dot.ir) * 0.3;
          dot.ig += (dot.g - dot.ig) * 0.3;
          dot.ib += (dot.b - dot.ib) * 0.3;
          dot.ia += (dot.a - dot.ia) * 0.1;
          combined = false;
        }

        return drawDot(dot);
      });
      if (!combined) {
        window.requestAnimationFrame(() => {
          return combineAnimate();
        });
      } else {
        setTimeout(() => {
          // 多个图案调用
          // return separateAnimate();
        }, 1500);
      }
    };
    const separateAnimate = () => {
      let separated = false;
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      dots.map((dot: any) => {
        if (
          Math.abs(dot.ix - dot.tx) < 0.1 &&
          Math.abs(dot.iy - dot.ty) < 0.1 &&
          Math.abs(dot.iz - dot.tz) < 0.1
        ) {
          dot.ix = dot.tx;
          dot.iy = dot.ty;
          dot.iz = dot.tz;
          dot.ir = dot.tr;
          dot.ig = dot.tg;
          dot.ib = dot.tb;
          dot.ia = dot.ta;
          separated = true;
        } else {
          dot.ix += (dot.tx - dot.ix) * 0.07;
          dot.iy += (dot.ty - dot.iy) * 0.07;
          dot.iz += (dot.tz - dot.iz) * 0.07;
          dot.ir += (dot.tr - dot.ir) * 0.02;
          dot.ig += (dot.tg - dot.ig) * 0.02;
          dot.ib += (dot.tb - dot.ib) * 0.02;
          dot.ia += (dot.ta - dot.ia) * 0.03;
          separated = false;
        }

        return drawDot(dot);
      });

      if (!separated) {
        window.requestAnimationFrame(() => {
          return separateAnimate();
        });
      } else {
        setTimeout(() => {
          return picLoop(); //间接递归，使用尾递归优化
        }, 100);
      }
    };
    const picLoop = function () {
      // dots = []; //绘制当前图片
      toPaticale(); //得到像素点
      combineAnimate(); //合成图像
    };
    const drawDot = (dot: any) => {
      let scale = initz / (initz + dot.iz);
      ctx!.save();
      ctx!.beginPath();
      ctx!.fillStyle = `rgba(${Math.floor(dot.ir)}, ${Math.floor(
        dot.ig
      )}, ${Math.floor(dot.ib)}, ${dot.ia})`;
      ctx!.arc(
        canvas.width / 2 + (dot.ix - canvas.width / 2) * scale,
        canvas.height / 2 + (dot.iy - canvas.height / 2) * scale,
        radius * scale,
        0,
        Math.PI * 2
      );
      ctx!.fill();
      ctx!.closePath();
      ctx!.restore();
    };
    init();
  });

  return (
    <>
      <h2 className="text-center text-red-600">Particale</h2>
      
        <canvas id="canvas" height="500" width="1000"></canvas>
      
    </>
  );
};
export default Particale;
