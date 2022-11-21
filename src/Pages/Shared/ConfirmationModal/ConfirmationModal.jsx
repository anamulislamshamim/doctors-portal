import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, confirmDelete, willDelete }) => {
    return (
        <div>
            < input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{ title }</h3>
                    <p className="py-4">{ message }</p>
                    <div className="modal-action">
                        <label onClick={closeModal} htmlFor="confirmation-modal" className="btn btn-warning text-white font-semibold">Cancel</label>
                        <label onClick={() => confirmDelete( willDelete )} htmlFor="confirmation-modal" className="btn bg-red-900 font-semibold text-white">Confirm</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;