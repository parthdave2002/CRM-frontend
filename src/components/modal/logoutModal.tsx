import React, { FC } from 'react';
import { Button, Modal } from "flowbite-react";

interface PoropsData{
    openModal ?: boolean;
    handleClose : () => void;
    handleAccept: () => void;
}

const LogoutModal : FC <PoropsData> = ({openModal, handleClose, handleAccept}) => {
  return (
    <>
     <Modal dismissible show={openModal} onClose={() => handleClose()}>
              <Modal.Header className='text-[1rem] font-bold'>Add Taglog</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                    companies around the world are updating their terms of service agreements to comply.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                    to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                    soon as possible of high-risk data breaches that could personally affect them.
                  </p>
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