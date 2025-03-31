import { Button, Modal,} from "flowbite-react"; 
import { FC } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface SucessOrderModalProps{
    isOpenSuccessOrderModel: boolean  | undefined;
    setisOpenSuccessOrderModel: (value: boolean) => void;
}

const SuccessErrorModalPage: FC<SucessOrderModalProps>= function ({ isOpenSuccessOrderModel, setisOpenSuccessOrderModel }) {
    return (
        <Modal onClose={() => setisOpenSuccessOrderModel(false)}  show={isOpenSuccessOrderModel} size="md">
            <Modal.Body className="p-6">
                <div className="flex flex-col items-center gap-y-6 text-center"> <FaThumbsUp  className="text-7xl text-green-500 border rounded-full p-3 border-green-500" /> 
                    <p className="text-xl text-gray-500 dark:text-gray-100"> Order Placed Successfully </p>
                    <div className="flex items-center gap-x-3">  <Button color="gray"  onClick={() => setisOpenSuccessOrderModel(false)}> Okay </Button>   </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SuccessErrorModalPage;