import './style.css';

const Image = ({ name }: { name: string }) => {
  return (
    <div className="parent">
      <img
        src="https://gravatar.com/avatar/7a506a64225dc26e8c9b544fc8a9c368?s=200&d=mp&r=x"
        alt="Avatar"
        className="img rounded-circle"
      />
      <p>{name}</p>
    </div>
  );
};

export default Image;
