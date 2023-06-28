import "./modalBox.css";

function ModalBox(props) {
  const modalBoxH = (
    <div id="myModal" className="modal w3-container w3-center w3-animate-top">
      <div className="modal-content">
        <span
          id="modal-close"
          onClick={() => {
            props.display(false);
          }}
        >
          Close
        </span>
        <h3>{props.heading}</h3>
        <br />
        <br />
        <div className="text-center">{props.content}</div>
      </div>
    </div>
  );

  return modalBoxH;
}

export default ModalBox;
