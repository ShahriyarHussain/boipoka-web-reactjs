const Loader = (props) => {
  return (
    <div className='animate-pulse text-2xl font-bold text-darkblue p-1 ml-4'>
      {props.message && true ? props.message : "Loading..."}
    </div>
  );
};

export default Loader;
