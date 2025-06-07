export const ButtonLeft = ({ onClick, width, height }: any) => {
  return (
    <div onClick={onClick} style={{ width: width }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:bg-primary duration-75 hover:cursor-pointer rounded-full hover:stroke-black group"
      >
        <rect
          x="0.5"
          y="0.5"
          width="49"
          height="49"
          rx="24.5"
          stroke="white"
          className="group-hover:stroke-black"
        />
        <path
          d="M34.3385 24.9993H15.6719M15.6719 24.9993L25.0052 34.3327M15.6719 24.9993L25.0052 15.666"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
