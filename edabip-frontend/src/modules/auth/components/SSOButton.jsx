function SSOButton({ provider, onClick }) {
  return (
    <button onClick={onClick}>
      Sign in with {provider}
    </button>
  );
}

export default SSOButton;
