import React, { FC, useEffect, useState } from 'react';
import { Button, Label, Modal, Table } from 'flowbite-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ResetComplainlist, UpdateComplainlist } from '../../Store/actions';
import { FaPuzzlePiece, FaQuestionCircle } from 'react-icons/fa';

interface ComplainProps{
    setisOpenComplainModel :  ( value :  boolean ) => void;
    isOpenComplainModel ? : boolean;
} 

const ComplainDetails : FC <ComplainProps> = ({setisOpenComplainModel,isOpenComplainModel }) => {

    const dispatch = useDispatch();
    const [complainResolution, setComplainResolution] = useState("");

    const SingleComplainData =
    {
        "product_id": [
            "603d9d88f4560a001f9e3eab"
        ],
        "resolution": "close",
        "_id": "67eb7b3d2fe0cf29a4e78555",
        "title": " More Parth Complain ",
        "order_id": "#AB-250330-0001",
        "customer_id": "67c0b0e7749eda2a24d948d4",
        "priority": "medium",
        "Comment": [
            {
                "_id": "67eb7b3e2fe0cf29a4e78556",
                "name": "67a9c7963022e8352c60d5bf",
                "comment": " More Parth Complain ",
                "comment_date": "2025-04-01T05:35:57.998Z"
            },
            {
                "_id": "67eb7b3e2fe0cf29a4e78556",
                "name": "67a9c7963022e8352c60d5bf",
                "comment": " More Parth Complain ",
                "comment_date": "2025-04-01T05:35:57.998Z"
            },
            {
                "_id": "67eb7b3e2fe0cf29a4e78556",
                "name": "67a9c7963022e8352c60d5bf",
                "comment": " More Parth Complain ",
                "comment_date": "2025-04-01T05:35:57.998Z"
            }
        ],
        "complain_id": "#ABC-010425-0001",
        "created_by": "67a9c7963022e8352c60d5bf",
        "created_at": "2025-04-01T05:35:58.002Z",
        "date": "2025-04-01T05:35:58.002Z",
        "is_resolved_by": true
    }
    
    const priorityoption =[
        {  label :"High",  value : "high"  },
        {   label :"Medium",   value : "medium" },
        {   label :"Low",   value : "low" },
    ]

    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState("");
    const [validateactive, setValidateactive] = useState(0);

    const IsActivedata = (data: any) => {
        if (!data) {
            setSelectedactiveid("");
            setSelectedactiveOption(null);
            setValidateactive(1)
        } else {
            setSelectedactiveid(data.value);
            setSelectedactiveOption(data);
            setValidateactive(0)
        }
    };

    const [initialValues, setinitialValues] = useState({
        comment: "",
        priority: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,

        validationSchema: Yup.object({
            comment: Yup.string().required("Please enter comment")
        }),

        onSubmit: (values) => {
            if (!selectedactiveid) {
                setValidateactive(1);
                return;
            }

            let requserdata = {
                id: SingleComplainData?._id,
                priority: selectedactiveid,
                comment: [{ "comment": values?.comment }],
                complain_id: SingleComplainData?.complain_id,
                resolution : complainResolution
            };

            dispatch(UpdateComplainlist(requserdata)); 
        },
    });


    // --------------- Update Complainlist code start --------------------
        const ComplainUpdatedlist = useSelector((state: any) => state.Complain.updateComplainlist);
        useEffect(() => {
            if (ComplainUpdatedlist?.success) {
                setisOpenComplainModel(false)
                dispatch(ResetComplainlist());
                validation.values.comment = "";
                setSelectedactiveOption(null)
                setSelectedactiveid("")
                setValidateactive(0)
            }
        }, [ComplainUpdatedlist])
    // --------------- Update Complainlist code end --------------------

  return (
    <div>
        <Modal onClose={() => setisOpenComplainModel(false)} show={isOpenComplainModel} size="6xl" className="backdrop-blur-sm p-3" >
            <Modal.Header>   <div className='text-[2rem] dark:text-gray-200 font-bold'> Complain Details  </div>   </Modal.Header>
            <div className='p-3'>
                <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                      <div className='mb-[2rem] p-3'>
                          <div className='flex gap-x-4'>
                              <div className='flex-1'>
                                  <Label htmlFor="comment">Comment </Label>
                                  <div className="mt-1">
                                      <Input
                                          id="comment"
                                          name="comment"
                                          className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                          placeholder="Enter comment"
                                          type="text"
                                          onChange={validation.handleChange}
                                          onBlur={validation.handleBlur}
                                          value={validation.values.comment || ""}
                                          invalid={validation.touched.comment && validation.errors.comment ? true : false}
                                      />
                                      {validation.touched.comment && validation.errors.comment ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.comment} </FormFeedback>) : null}
                                  </div>
                              </div>

                              <div className='flex-1'>
                                  <Label htmlFor="priority"> Priority </Label>
                                  <div className="mt-1">
                                      <Select
                                          className="w-full dark:text-white"
                                          classNames={{
                                              control: () => "react-select__control",
                                              singleValue: () => "react-select__single-value",
                                              menu: () => "react-select__menu",
                                              option: ({ isSelected }) =>
                                                  isSelected ? "react-select__option--is-selected" : "react-select__option",
                                              placeholder: () => "react-select__placeholder",
                                          }}

                                          value={selectedactiveOption}
                                          onChange={(e) => { IsActivedata(e) }}
                                          options={priorityoption}
                                          isClearable={true}
                                      />
                                      {validateactive == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select priority </FormFeedback>) : null}
                                  </div>
                              </div>
                          </div>
                          <div className='flex gap-x-3 justify-end'>
                             <Button type='submit' className='mt-3 mt-3 bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl border-0' onClick={() => setComplainResolution("open") } ><div className='flex items-center gap-x-3'> <FaQuestionCircle  className="text-xl "  /> Add Comment </div> </Button>
                            {SingleComplainData?.is_resolved_by ?  <Button type='submit' className='mt-3 mt-3 bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl border-0' onClick={() => setComplainResolution("close") } ><div className='flex items-center gap-x-3'> <FaPuzzlePiece  className="text-xl "/> Resolved   </div>   </Button>  : null  } 
                          </div>                
                      </div>
                </Form>

                <div className='max-h-[18rem] overflow-scroll'>
                      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                          <Table.Head className="bg-gray-100 dark:bg-gray-700">
                              <Table.HeadCell> Date</Table.HeadCell>
                              <Table.HeadCell>Name </Table.HeadCell>
                              <Table.HeadCell> Comment</Table.HeadCell>
                          </Table.Head>

                          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                              {SingleComplainData?.Comment && SingleComplainData?.Comment.map((item: any, k: number) => (
                                  <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.comment_date).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.name} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.comment} </Table.Cell>
                                  </Table.Row>
                              ))}
                          </Table.Body>
                      </Table>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default ComplainDetails