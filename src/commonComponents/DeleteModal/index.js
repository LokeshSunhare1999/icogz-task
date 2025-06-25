import Image from "next/image";
import Button from "../Button";

export const DeleteModal = ({ isOpen, onClose, onConfirm, workspaceName, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[1.5px] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl ">
        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Image
              src="/deleteIcon.svg"
              alt="delete icon"
              width={20}
              height={20}
              className='pointer-cursor'
            />
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>"{workspaceName}"</strong>?
        </p>

        <div className="flex gap-3 justify-end">
          <Button
            onClick={onClose}
            disabled={isDeleting}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            loading={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};