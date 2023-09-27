import "./Input.scoped.css";

const Input = ({ placeholder }) => {
  return (
    <div className="inputcontainer">
      <input type="text" name="input" placeholder={placeholder} />
    </div>
  );
}

export default Input
