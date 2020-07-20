import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numDisplay: "",
      allowOp: false,
      resetOnNum: false
    };
  }

  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const ops = ["+", "-", "\u00D7", "\u00F7"];
    const buttonClickHandler = n => {
      console.log(n);
      if (ops.includes(n) && !this.state.allowOp) return;
      if (numbers.includes(n)) {
        this.setState({ allowOp: true });
        if (this.state.resetOnNum) {
          this.setState({
            numDisplay: n,
            resetOnNum: false
          });
          return;
        }
      }

      this.setState({
        numDisplay: this.state.numDisplay + n,
        resetOnNum: false
      });
    };
    const equalHandler = () => {
      this.setState({ resetOnNum: true });
      // eval the num display
      let evThis = this.state.numDisplay;

      if (ops.includes(evThis[evThis.length - 1]))
        evThis = evThis.substr(0, evThis.length - 1);

      console.log("handle: ", evThis);
      let curOp = null;
      let curRes = null;
      evThis.split(/(\+|\-|\u00D7|\u00F7)/).forEach(e => {
        console.log(e);
        if (Number.isInteger(parseInt(e))) {
          console.log("handle number");
          curOp
            ? (curRes = applyOp(curRes, parseInt(e), curOp))
            : (curRes = parseInt(e));
        } else {
          console.log("handle op");
          curOp = e;
        }
      });
      this.setState({ numDisplay: curRes });
    };

    const applyOp = (n1, n2, op) => {
      console.log("handle op: ", op);
      if (op == "+") {
        return n1 + n2;
      }
      if (op == "-") {
        return n1 - n2;
      }
      if (op == "\u00D7") {
        return n1 * n2;
      }
      if (op == "\u00F7") {
        return n1 / n2;
      }
      return "It's fucked";
    };

    const clearHandler = () => {
      this.setState({
        numDisplay: "",
        allowOp: false
      });
    };

    return (
      <div id="main">
        <div id="display">
          <Display display={this.state.numDisplay} />
        </div>
        <div id="numbers-grid">
          {numbers.map(n => {
            return <Button key={n} number={n} onClick={buttonClickHandler} />;
          })}
        </div>
        <div id="ops-grid">
          {ops.map(n => {
            return <Button key={n} number={n} onClick={buttonClickHandler} />;
          })}
          <Button key={"="} number={"="} onClick={equalHandler} />
          <Button key={"C"} number={"C"} onClick={clearHandler} />
        </div>
      </div>
    );
  }
}

const Button = props => {
  let display = props.number;

  return (
    <button
      onClick={() => {
        props.onClick(props.number);
      }}
    >
      {display}
    </button>
  );
};

const Display = props => {
  return (
    <span style={{ maxWidth: "150px", overflow: "hidden" }}>
      {props.display}
    </span>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
