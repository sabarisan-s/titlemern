import React from "react";

const Modal = ({ onClose, open, onOk }) => {
    return (
        <>
            <div
                className={`${
                    open
                        ? "fixed inset-0 flex justify-center items-center bg-gray-600/50"
                        : "hidden"
                }`}
            >
                <div className="w-60 h-60 bg-white rounded-md flex flex-col justify-between">
                    <div className="flex justify-end">
                        <div
                            className="text-lg font-bold hover:text-red-500 me-2"
                            onClick={onClose}
                        >
                            X
                        </div>
                    </div>
                    <div className="text-center">Are sure want to delete!</div>
                    <div className="flex justify-around mb-3">
                        <button
                            className="btn hover:bg-red-700"
                            onClick={onOk}
                        >
                            Confirm
                        </button>
                        <button
                            className="btn hover:bg-blue-500 "
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    ); 
};

export default Modal;
