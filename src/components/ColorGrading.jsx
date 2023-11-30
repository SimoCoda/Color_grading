import { useState, useEffect } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { v4 as uuidv4 } from "uuid";

const ColorGrading = () => {
  const [isError, setIsError] = useState(false);
  const [colorInput, setColorInput] = useState({
    color: "",
    qyt: 5,
  });
  const [selectedColor, setSelectedColor] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (colorInput.color && colorInput.qyt) {
      const { color, qyt } = colorInput;
      try {
        setSelectedColor(
          new Values(color).all(Math.round(100 / parseInt(qyt, 10)) * 2)
        );
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setColorInput({
      ...colorInput,
      [name]: value,
    });
  };

  useEffect(() => {
    setColorInput({ qyt: 10, color: "" });
    setSelectedColor(new Values("#1194ec").all(Math.round(100 / 10) * 2));
  }, []);

  useEffect(()=> {
    const timer =  setTimeout(()=> {
      setIsError(false)
    }, 2000)
    return () => clearTimeout(timer)
  })

  return (
    <>
      <h1>Color Grading</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Scrivi un colore (#f1ff02)"
            name="color"
            id="color"
            value={colorInput.color}
            maxLength={7}
            onChange={handleChange}
            className="input"
          />
          <input
            type="number"
            name="qyt"
            id="qyt"
            value={colorInput.qyt}
            maxLength={100}
            minLength={5}
            step={5}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="btn btn-selector">
          Create
        </button>
      </form>
      <section className="color-section">
        {isError ? (
            <article style={{marginLeft: "20px"}}>
              <h2 style={{ fontStyle: "italic", fontSize: 20, color: "red" }}>
                Nessun colore trovato!
              </h2>
            </article>
        ) : selectedColor ? (
          selectedColor.map((el) => <SingleColor key={uuidv4()} {...el} />)
        ) : (
          <div className="container">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        )}
      </section>
    </>
  );
};

export default ColorGrading;
