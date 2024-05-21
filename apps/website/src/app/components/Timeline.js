import React from 'react';

const VerticalTimeline = ({ items }) => {
  return (
    <div className="relative">
      <div className="relative">
        <div className="vertical-line "></div>
        <ol className="  border-gray-300 ">
          {items.map((item, index) => (
            <li
              key={index}
              className={` flex justify-${
                index % 2 === 0 ? 'end' : 'start'
              } items-center w-full mb-40`}
            >
              <div
                className={`flex items-center w-full ${
                  index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                } w-1/2 `}
              >
                <div className="bg-zinc-900 w-6 h-6 flex items-center justify-center rounded-full absolute mx-auto left-1/2 transform -translate-x-1/2">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    className="text-white w-3 h-3"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                    ></path>
                  </svg>
                </div>
                <div
                  className={`block p-6 rounded-lg shadow-lg bg-gray-100 w-1/3 max-w-md ${
                    index % 2 === 0 ? 'ml-6' : 'mr-6'
                  } `}
                >
                  <div className="flex justify-between mb-4">
                    <a
                      href="#!"
                      className="font-medium text-zinc-900 hover:text-zinc-700 focus:text-zinc-800 duration-300 transition ease-in-out text-sm"
                    >
                      {item.title}
                    </a>
                    <a
                      href="#!"
                      className="font-medium text-zinc-900 hover:text-zinc-700 focus:text-zinc-800 duration-300 transition ease-in-out text-sm"
                    >
                      {item.date}
                    </a>
                  </div>
                  <p className="text-gray-700 mb-6">{item.description}</p>
                  <button
                    type="button"
                    className="inline-block px-4 py-1.5 bg-zinc-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default VerticalTimeline;
