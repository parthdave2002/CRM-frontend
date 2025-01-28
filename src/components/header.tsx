import type { FC } from "react";
import { Button } from "reactstrap";

interface Props {
  isOpenHeader?: Boolean;
}

const ExampleHeader: FC<Props> = ( isOpenHeader ): JSX.Element => {

  const handleClose = () =>{
    isOpenHeader.isOpenHeader(false)
  }


  return (
    <>
      <div className="w-full p-1 lg:px-5 lg:pl-3 justify-between flex bg-indigo-600 self-center whitespace-nowrap text-center 0 dark:bg-gray-900 font-semibold dark:text-white">
        Header Section
        <Button
          className="self-end"
          onClick={() => {handleClose()}}
        >
          X
        </Button>
      </div>
    </>
  );
};

export default ExampleHeader;
