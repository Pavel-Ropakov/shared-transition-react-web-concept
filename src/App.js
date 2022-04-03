import { Switch, Route, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import "./App.css";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const cats = [
  {
    name: "Kuzia",
    url: "/c1.jpeg",
    description: text,
  },
  {
    name: "Borya",
    url: "/c2.jpeg",
    description: text,
  },
  {
    name: "Senya",
    url: "/c3.jpeg",
    description: text,
  },
  {
    name: "Barsik",
    url: "/c4.jpg",
    description: text,
  },
  {
    name: "Murka",
    url: "/c5.jpeg",
    description: text,
  },
];

function App() {
  const history = useHistory();
  const ghostRef = useRef(null);

  const goCatPage = (catName) => {
    history.push(`/cat/${catName}`);
  };

  const activateAnimation = (cat, element, rect) => {
    element.classList.add("SharedElement");
    element.style.top = `${rect.top}px`;
    element.style.left = `${rect.left}px`;
    element.style.height = `${rect.height}px`;
    element.style.width = `${rect.width}px`;

    ghostRef.current.appendChild(element);

    requestAnimationFrame(() => {
      element.style.transform = `translateY(-${rect.top}px)`;
      element.style.width = `680px`;
      element.style.height = `400px`;
    });

    element.addEventListener(
      "transitionend",
      () => {
        goCatPage(cat.name);
      },
      { once: true }
    );
  };
  return (
    <>
      <Switch>
        <Route exact path="/">
          <CatList activateAnimation={activateAnimation} />
          <div ref={ghostRef} className="AnimationGhost"></div>
        </Route>
        <Route path="/cat/:catName">
          <CatPage />
        </Route>
      </Switch>
    </>
  );
}

const CatPage = () => {
  const { catName } = useParams();
  const cat = cats.find((c) => c.name === catName);

  return (
    <div className="CatPage">
      <img className="CatPage_Avatar" alt="beautiful cat" src={cat.url} />
      <div className="CatPage_Body">
        <b>{catName}</b>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CatList = ({ activateAnimation }) => {
  const imgRef = useRef({});
  const [hiding, setHiding] = useState(false);

  const animate = (cat) => {
    const img = imgRef.current[cat.name];
    const clone = img.cloneNode(true);
    const clientRects = img.getBoundingClientRect();
    img.style.visibility = "hidden";
    setHiding(true);
    activateAnimation(cat, clone, clientRects);
  };

  return (
    <div className={hiding ? "CatList__Hiding" : ""}>
      {cats.map((cat) => (
        <div key={cat.name} className="CatRow" onClick={() => animate(cat)}>
          <img
            ref={(img) => (imgRef.current[cat.name] = img)}
            className="CatRow_Avatar"
            alt="beautiful cat"
            src={cat.url}
          />
          <div className="CatRow_Content">
            <h2>{cat.name}</h2>
            <span>{cat.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
