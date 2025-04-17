import React, { FC, useState } from 'react';
import { Button, Label, Modal } from "flowbite-react";
import Select from "react-select";
import { Form, FormFeedback } from 'reactstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';

interface PoropsData{
    openModal ?: boolean;
    handleClose : () => void;
    handleAccept: () => void;
}

const LogoutModal : FC <PoropsData> = ({openModal, handleClose, handleAccept}) => {

    // -------------- Land type code start ---------
    const LandTypeOptions= [
      { label :"Acre", value : "acre"},
      { label :"Bigha", value : "bigha"},
      { label :"Hacter", value : "hacter"},
    ]
  
    const [selectedlandtypeOption, setSelectedlandtypeOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedlandtypeid, setSelectedlandtypeid] = useState<string | null>(null);
    const [validatelandtype, setValidatelandtype] = useState(0);
    
    const Islandypedata = (data: any) => {
      if (!data) {
        setSelectedlandtypeid("");
        setSelectedlandtypeOption(null);
        setValidatelandtype(1)
      } else {
        setSelectedlandtypeid(data.value);
        setSelectedlandtypeOption(data);
        setValidatelandtype(0)
      }
    };
    // -------------- Land type code end ---------

  return (
    <>
     <Modal dismissible show={openModal} onClose={() => handleClose()}>
              <Modal.Header className='text-[1rem] font-bold'>Add Taglog</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                       <div className='flex-1'>
                                    <Label htmlFor="taglog"> Taglog <span className='text-red-500'>*</span></Label>
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
                                        value={selectedlandtypeOption}
                                        onChange={(e) => { Islandypedata(e) }}
                                        options={LandTypeOptions}
                                        isClearable={true}
                                      />
                                      {validatelandtype == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select taglog </FormFeedback> ) : null}
                                    </div>
                                  </div>


                                   <div className='flex-1'>
                                                <Label htmlFor="land_type"> Sub Taglog <span className='text-red-500'>*</span></Label>
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
                                                    value={selectedlandtypeOption}
                                                    onChange={(e) => { Islandypedata(e) }}
                                                    options={LandTypeOptions}
                                                    isClearable={true}
                                                  />
                                                  {validatelandtype == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select sub taglog </FormFeedback> ) : null}
                                                </div>
                                              </div>
                </div>
              </Modal.Body>
              <Modal.Footer className='py-2'>
                <Button onClick={() => handleAccept()}>I accept</Button>
                <Button color="gray" onClick={() => handleClose()}> Decline  </Button>
              </Modal.Footer>
            </Modal>
    </>
  )
}

export default LogoutModal