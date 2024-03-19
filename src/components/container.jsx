import { useEffect, useState } from "react";

const Container = () => {
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [rating, setRating] = useState('');
    const [ratingBgColor, setRatingBgColor] = useState('');


    const handleChange = (event, setInputFunction) => {
        setInputFunction(event.target.value);
    };

    const hexToRGB = (colorValue)=> {
        const red = parseInt(colorValue.substring(1, 3), 16);
        const green = parseInt(colorValue.substring(3, 5), 16);
        const blue = parseInt(colorValue.substring(5, 7), 16);
        return [red, green, blue];
    }

    const calculateContrastRatio = (color1, color2) => {
        const luminance1 = getRelativeLuminance(color1);
        const luminance2 = getRelativeLuminance(color2);
        const light = Math.max(luminance1, luminance2);
        const dark = Math.min(luminance1, luminance2);
        const contrast = (light + 0.05) / (dark + 0.05);
        return contrast;
    };

    const getRelativeLuminance = (color) => {
        const sRGB = color.map((val) => {
          const s = val / 255;
          return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    };

    const calcRating = (contrastVal) => {
        if (contrastVal > 12) {
          setRatingBgColor('bg-green-500')
          return "Super";
        } else if (contrastVal > 7) {
          setRatingBgColor('bg-green-300')
          return "Very Good";
        } else if (contrastVal > 5) {
          setRatingBgColor('bg-yellow-300')
          return "Good";
        } else if (contrastVal > 3) {
          setRatingBgColor('bg-red-400')
          return "Poor";
        } else {
          setRatingBgColor('bg-red-500')
          return "Very Poor";
        }
      };
    
    useEffect(()=>{
        let textColorRGBArray = hexToRGB(color1);
        let bgColorRGBArray = hexToRGB(color2); 

        const contrast = calculateContrastRatio(textColorRGBArray, bgColorRGBArray);

        setRating(calcRating(contrast));
    }, [color1 , color2]) 

  return (
    <section className="md:w-1/3 w-full h-auto rounded-2xl shadow-black shadow-2xl bg-gradient-to-br from-yellow-400 to-pink-600 ">
        <header className="w-full h-auto py-10 flex items-center justify-center"> 
            <p className="md:text-4xl font-bold text-2xl text-white font-mono">COLOR CONTRAST CHECKER</p>
        </header>
        <section className="w-full flex">
            <div className="px-14 py-5 w-1/2">
              <div className="text-center p-3 flex items-center justify-center">
                <div className="p-2 w-auto h-auto">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden flex items-center justify-center">
                    <input type="color" name="color1" id="Color1" className="w-28 h-28 absolute " onChange={(event) => handleChange(event, setColor1)}/> 
                  </div>
                  <p className="text-2xl font-semibold my-3 text-white">{color1 ? color1 : '#000000'}</p>
                </div>
              </div>
            </div>
            <div className="px-14 py-5 w-1/2">
              <div className="text-center p-3 flex items-center justify-center">
                <div className="p-2 w-auto h-auto">
                  <div className="w-24 h-24 relative rounded-xl overflow-hidden flex items-center justify-center">
                    <input type="color" name="color2" id="Color1" className="w-28 h-28 absolute" onChange={(event) => handleChange(event, setColor2)}/>
                  </div>
                  <p className="text-2xl font-semibold my-3 text-white">{color2 ? color2 : '#000000'}</p>
                </div>
              </div>
            </div>
        </section>
        <section className="w-full h-aut  o px-14 py-8 flex items-center justify-center">
            <p className={`text-white text-3xl font-bold px-8 py-9 ${ratingBgColor} rounded-2xl`}>{rating}</p>
        </section>
    </section>
  )
}

export default Container