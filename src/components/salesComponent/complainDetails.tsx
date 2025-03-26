import React, { FC, useEffect, useState } from 'react';
import { Button, Label, Modal, Table } from 'flowbite-react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { UpdateComplainlist } from '../../Store/actions';

interface ComplainProps{
    setisOpenComplainModel :  ( value :  boolean ) => void;
    isOpenComplainModel ? : boolean;
} 

const ComplainDetails : FC <ComplainProps> = ({setisOpenComplainModel,isOpenComplainModel }) => {

    const dispatch = useDispatch();
    const ComplainData =[
        {
            date : "2025-03-20T00:00:00.000+00:00",
            name  : "Parth Dave",
            comment : " We will definatilty completed tomorrow "
        },
        {
            date : "2025-03-23T00:00:00.000+00:00",
            name  : "Rupa Shukla ",
            comment : " We will definatilty completed today "
        },
        {
            date : "2025-03-26T00:00:00.000+00:00",
            name  : "Akshay Solanki ",
            comment : " We already solved "
        }, {
            date : "2025-03-20T00:00:00.000+00:00",
            name  : "Parth Dave",
            comment : " We will definatilty completed tomorrow "
        },
        {
            date : "2025-03-23T00:00:00.000+00:00",
            name  : "Rupa Shukla ",
            comment : " We will definatilty completed today "
        },
        {
            date : "2025-03-26T00:00:00.000+00:00",
            name  : "Akshay Solanki ",
            comment : " We already solved "
        }
    ]

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
            status : "",
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
                    comment: values?.comment,
                    priority: selectedactiveid,
                    complain_id : "#ABC-123"
                };

              dispatch(UpdateComplainlist(requserdata));

              validation.values.comment = "";
              setSelectedactiveOption(null)
              setSelectedactiveid("")
              setValidateactive(0)
            },
        });

  return (
    <div>

        <Modal onClose={() => setisOpenComplainModel(false)}  show={isOpenComplainModel} size="6xl" className="backdrop-blur-sm p-3" >
            <Modal.Header>   <div className='text-[2rem] dark:text-gray-200 font-bold'> Complain Details  </div>   </Modal.Header>
                <div className='p-3  '>
                        <Form  onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} > 
                            <div className='mb-[2rem] shadow shadow-md p-4 rounded-xl'>
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
                                                    invalid={ validation.touched.comment && validation.errors.comment ? true : false}
                                                />
                                                {validation.touched.comment && validation.errors.comment ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.comment} </FormFeedback> ) : null}
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
                                                 {validateactive == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select priority </FormFeedback>  ) : null}
                                                </div>
                                        </div>
                                    </div>
                                    <Button type='submit' className='mt-3' > Add Complain </Button>
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
                                    {ComplainData && ComplainData.map((item: any, k:number) => (
                                          <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.date).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
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